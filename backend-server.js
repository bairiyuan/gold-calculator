const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
};

async function callDeepSeekAPI() {
    const apiKey = 'sk-c4555da16fa64d19bb13f4c7361352a3';
    const url = 'https://api.deepseek.com/chat/completions';
    
    const prompt = `请生成5条今天的金融和股市相关的新闻资讯，每条包含：
1. 一个吸引人的标题（带emoji）
2. 一段简短的描述（50-100字）
3. 时间（今天的时间，格式：YYYY-MM-DD HH:MM）

请直接返回JSON格式，不要任何其他文字。格式如下：
[
    {
        "title": "标题",
        "desc": "描述",
        "time": "时间"
    }
]

请确保内容看起来是真实的、最新的金融资讯。`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            let content = data.choices[0].message.content;
            content = content.trim();
            if (content.startsWith('```json')) {
                content = content.slice(7);
            }
            if (content.startsWith('```')) {
                content = content.slice(3);
            }
            if (content.endsWith('```')) {
                content = content.slice(0, -3);
            }
            return JSON.parse(content.trim());
        }
        
        return getDefaultNews();
    } catch (error) {
        console.error('API调用失败:', error);
        return getDefaultNews();
    }
}

function getDefaultNews() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return [
        {
            title: "📈 三大指数集体上涨，沪指涨1.5%收复3200点",
            desc: "今日A股市场整体走强，沪指、深证成指、创业板指均出现明显上涨，两市成交额突破1.2万亿元。",
            time: `${dateStr} 09:30`
        },
        {
            title: "💰 黄金价格再创历史新高，突破780元/克",
            desc: "受国际地缘政治局势影响，避险情绪升温，黄金价格持续上涨，今日最高触及785元/克。",
            time: `${dateStr} 10:15`
        },
        {
            title: "🏦 央行宣布降准0.5个百分点，释放长期资金约1万亿元",
            desc: "为支持实体经济发展，中国人民银行决定下调金融机构存款准备金率，将于下周一正式实施。",
            time: `${dateStr} 11:00`
        },
        {
            title: "📊 新能源板块持续走强，多只个股涨停",
            desc: "光伏、储能、新能源车等新能源板块今日表现亮眼，板块整体涨幅超4%。",
            time: `${dateStr} 13:45`
        },
        {
            title: "⚡ 半导体板块异动拉升，国产替代概念受关注",
            desc: "受政策利好消息刺激，半导体板块午后拉升，芯片设计、设备制造等细分领域领涨。",
            time: `${dateStr} 14:20`
        }
    ];
}

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/news' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        const news = await callDeepSeekAPI();
        res.end(JSON.stringify(news));
        return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`服务器已启动！`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`API地址: http://localhost:${PORT}/api/news`);
});
