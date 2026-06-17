document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    refreshNews();
});

interface NewsItem {
    title: string;
    desc: string;
    time: string;
}

async function refreshNews(): Promise<void> {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;
    
    try {
        newsList.innerHTML = '<div style="text-align: center; padding: 30px; color: #8b6914;">🔄 正在获取最新资讯...</div>';
        
        let apiUrl = '/api/news';
        if (window.location.protocol === 'file:') {
            apiUrl = 'http://localhost:3000/api/news';
        }
        
        const response = await fetch(apiUrl);
        const newsData: NewsItem[] = await response.json();
        
        newsList.innerHTML = newsData.map(news => `
            <div class="news-item">
                <div class="news-title">${news.title}</div>
                <div class="news-desc">${news.desc}</div>
                <div class="news-time">${news.time}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('获取资讯失败:', error);
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        const defaultNews = [
            { title: "📈 三大指数集体上涨，沪指涨1.5%收复3200点", desc: "今日A股市场整体走强，沪指、深证成指、创业板指均出现明显上涨，两市成交额突破1.2万亿元。", time: `${dateStr} 09:30` },
            { title: "💰 黄金价格再创历史新高，突破780元/克", desc: "受国际地缘政治局势影响，避险情绪升温，黄金价格持续上涨，今日最高触及785元/克。", time: `${dateStr} 10:15` },
            { title: "🏦 央行宣布降准0.5个百分点，释放长期资金约1万亿元", desc: "为支持实体经济发展，中国人民银行决定下调金融机构存款准备金率，将于下周一正式实施。", time: `${dateStr} 11:00` },
            { title: "📊 新能源板块持续走强，多只个股涨停", desc: "光伏、储能、新能源车等新能源板块今日表现亮眼，板块整体涨幅超4%。", time: `${dateStr} 13:45` },
            { title: "⚡ 半导体板块异动拉升，国产替代概念受关注", desc: "受政策利好消息刺激，半导体板块午后拉升，芯片设计、设备制造等细分领域领涨。", time: `${dateStr} 14:20` }
        ];
        newsList.innerHTML = defaultNews.map(news => `
            <div class="news-item">
                <div class="news-title">${news.title}</div>
                <div class="news-desc">${news.desc}</div>
                <div class="news-time">${news.time}</div>
            </div>
        `).join('');
    }
}

function initTabs(): void {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = (btn as HTMLElement).dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            if (tabId) {
                document.getElementById(tabId)?.classList.add('active');
            }
        });
    });

    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subTabId = (btn as HTMLElement).dataset.subTab;
            
            subTabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            if (subTabId) {
                document.getElementById(subTabId)?.classList.add('active');
            }
        });
    });

    const modeTabBtns = document.querySelectorAll('.mode-tab-btn');
    modeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = (btn as HTMLElement).closest('.sub-tab-content, .tab-content');
            const mode = (btn as HTMLElement).dataset.mode || (btn as HTMLElement).dataset.fundMode;
            
            if (container) {
                container.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
                container.querySelectorAll('.mode-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                if (mode) {
                    const modeContent = container.querySelector((btn as HTMLElement).dataset.mode ? '#mode-' + mode : '#fund-mode-' + mode);
                    modeContent?.classList.add('active');
                }
            }
        });
    });
}

function calculateByAmount(): void {
    const existingWeight = parseFloat((document.getElementById('existing-weight-amount') as HTMLInputElement).value);
    const existingPrice = parseFloat((document.getElementById('existing-price-amount') as HTMLInputElement).value);
    const newAmount = parseFloat((document.getElementById('new-amount') as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById('new-price-amount') as HTMLInputElement).value);

    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newAmount) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }

    const existingCost = existingWeight * existingPrice;
    const newWeight = newAmount / newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newAmount;
    const newAvgPrice = newTotalCost / newTotalWeight;

    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice);
}

function calculateByWeight(): void {
    const existingWeight = parseFloat((document.getElementById('existing-weight-weight') as HTMLInputElement).value);
    const existingPrice = parseFloat((document.getElementById('existing-price-weight') as HTMLInputElement).value);
    const newWeight = parseFloat((document.getElementById('new-weight') as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById('new-price-weight') as HTMLInputElement).value);

    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newWeight) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }

    const existingCost = existingWeight * existingPrice;
    const newCost = newWeight * newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newCost;
    const newAvgPrice = newTotalCost / newTotalWeight;

    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice);
}

function calculateByPercentage(): void {
    const existingPrice = parseFloat((document.getElementById('existing-price-percent') as HTMLInputElement).value);
    const newPercent = parseFloat((document.getElementById('new-percent') as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById('new-price-percent') as HTMLInputElement).value);

    if (isNaN(existingPrice) || isNaN(newPercent) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }

    const newTotalWeight = 100 + newPercent;
    const newTotalCost = 100 * existingPrice + newPercent * newPrice;
    const newAvgPrice = newTotalCost / newTotalWeight;

    displayDepositResult(newTotalWeight, newTotalCost, newAvgPrice, true);
}

function displayDepositResult(weight: number, cost: number, avgPrice: number, isPercent: boolean = false): void {
    const weightEl = document.getElementById('new-total-weight');
    const costEl = document.getElementById('new-total-cost');
    const priceEl = document.getElementById('new-avg-price');

    if (weightEl) {
        weightEl.textContent = isPercent ? weight.toFixed(2) + '% (相对权重)' : weight.toFixed(4);
    }
    if (costEl) {
        costEl.textContent = cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = avgPrice.toFixed(4);
    }
}

function calculateFundByAmount(): void {
    const existingWeight = parseFloat((document.getElementById('fund-existing-weight-amount') as HTMLInputElement).value);
    const existingPrice = parseFloat((document.getElementById('fund-existing-price-amount') as HTMLInputElement).value);
    const newAmount = parseFloat((document.getElementById('fund-new-amount') as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById('fund-new-price-amount') as HTMLInputElement).value);

    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newAmount) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }

    const existingCost = existingWeight * existingPrice;
    const newWeight = newAmount / newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newAmount;
    const newAvgPrice = newTotalCost / newTotalWeight;

    displayFundResult(newTotalWeight, newTotalCost, newAvgPrice);
}

function calculateFundByWeight(): void {
    const existingWeight = parseFloat((document.getElementById('fund-existing-weight-weight') as HTMLInputElement).value);
    const existingPrice = parseFloat((document.getElementById('fund-existing-price-weight') as HTMLInputElement).value);
    const newWeight = parseFloat((document.getElementById('fund-new-weight') as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById('fund-new-price-weight') as HTMLInputElement).value);

    if (isNaN(existingWeight) || isNaN(existingPrice) || isNaN(newWeight) || isNaN(newPrice)) {
        alert('请填写所有输入项');
        return;
    }

    const existingCost = existingWeight * existingPrice;
    const newCost = newWeight * newPrice;
    const newTotalWeight = existingWeight + newWeight;
    const newTotalCost = existingCost + newCost;
    const newAvgPrice = newTotalCost / newTotalWeight;

    displayFundResult(newTotalWeight, newTotalCost, newAvgPrice);
}

function displayFundResult(weight: number, cost: number, avgPrice: number): void {
    const weightEl = document.getElementById('fund-new-total-weight');
    const costEl = document.getElementById('fund-new-total-cost');
    const priceEl = document.getElementById('fund-new-avg-price');

    if (weightEl) {
        weightEl.textContent = weight.toFixed(4);
    }
    if (costEl) {
        costEl.textContent = cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = avgPrice.toFixed(4);
    }
}