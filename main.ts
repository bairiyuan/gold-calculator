document.addEventListener('DOMContentLoaded', () => {
    initTabs();
});

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
        if (isPercent) {
            weightEl.textContent = weight.toFixed(2) + '% 权重';
        } else {
            weightEl.textContent = weight.toFixed(4) + ' 克';
        }
    }
    if (costEl) {
        costEl.textContent = '¥' + cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = '¥' + avgPrice.toFixed(4);
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
        weightEl.textContent = weight.toFixed(4) + ' 份';
    }
    if (costEl) {
        costEl.textContent = '¥' + cost.toFixed(2);
    }
    if (priceEl) {
        priceEl.textContent = '¥' + avgPrice.toFixed(4);
    }
}
