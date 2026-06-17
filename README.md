# 黄金持仓均价计算器

一个简单易用的黄金持仓均价计算工具，让你一目了然算成本！

## ✨ 功能特点

- **积存金计算**
  - 按金额买：知道花多少钱
  - 按克数买：知道买多少克
  - 按比例估算：简单估算
- **黄金基金计算**
  - 按金额买
  - 按份额买
- **超详细说明**：小白也能看懂！
- **好看的界面**：温和的暖色调

## 🚀 快速开始

### 方法一：直接打开（最简单）

直接双击 `index.html` 文件，在浏览器中打开就能用！

### 方法二：本地服务器

```bash
# 使用 Python
python -m http.server 8080

# 或使用 Node.js 的 http-server
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

## 📖 使用说明

### 积存金 - 按金额买（最常用）

1. **输入你现在持有多少**
   - 持仓重量：比如 10 克
   - 持仓均价：比如 700 元/克

2. **输入这次要买多少**
   - 买入金额：比如 7000 元
   - 当前金价：比如 720 元/克

3. **点击"算一下"**

**结果示例：**
- 总持仓：19.72 克
- 总成本：14000 元
- 新均价：710 元/克

### 其他模式

- **按克数买**：输入要买多少克（比如买10克）
- **按比例估算**：不知道具体数量，按比例算（比如加仓20%）

## 🎨 自定义配置

### 修改背景图片

把你的图片命名为 `1ab203348206df1bd0d3810dedb31a73.png` 替换现有文件，或者修改 `style.css` 中的图片路径。

### 调整透明度

在 `style.css` 中修改：
- `body::before` 中的 `background: rgba(255, 255, 255, 0.6);`
- 最后那个数字（0.6）越小越透明，越大越不透明

## 📁 项目文件

```
.
├── index.html      # 主页面
├── style.css       # 样式
├── main.ts         # TypeScript 源代码
├── main.js         # 编译后的 JavaScript
├── tsconfig.json   # TypeScript 配置
├── .gitignore      # Git 忽略文件
├── README.md       # 说明文档
└── 1ab203348206df1bd0d3810dedb31a73.png  # 背景图片
```

## 🔧 开发说明

如果你想修改代码：

```bash
# 1. 安装 TypeScript（如果还没安装）
npm install -g typescript

# 2. 修改 main.ts 文件

# 3. 编译
tsc

# 4. 打开 index.html 查看效果
```

## 🌐 部署到 GitHub Pages

1. 把代码推送到 GitHub 仓库
2. 进入仓库的 Settings → Pages
3. 选择 Source：Deploy from a branch
4. 选择 Branch：main / root
5. 等待部署完成，就可以在线访问了！

## 📄 许可证

MIT License
