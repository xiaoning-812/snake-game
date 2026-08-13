# 贪吃蛇 Snake · React 版

基于 **Vite + React** 重构的贪吃蛇小游戏，游戏逻辑封装在自定义 Hook 中，UI 拆分为独立组件，构建产物为纯静态文件，可发布到任意静态托管平台。

## 玩法

- 桌面端：方向键 `↑ ↓ ← →` 或 `W A S D` 控制方向。
- 移动端：在画面上滑动，或点击屏幕下方的方向按钮。
- 吃到食物加分（每个 +10），蛇身变长、速度略微加快。
- 撞到墙壁或自己的身体则游戏结束。
- 最高分保存在浏览器 `localStorage` 中。

## 项目结构

```
src/
├── main.jsx                 应用入口
├── App.jsx                  组合各组件，绑定键盘与滑动操作
├── constants.js             集中管理网格、速度、按键映射等常量
├── styles.css               全局样式
├── hooks/
│   └── useSnakeGame.js      游戏状态机与主循环（核心逻辑）
└── components/
    ├── Board.jsx            canvas 渲染蛇与食物
    ├── Scoreboard.jsx       当前分数与最高分
    ├── Overlay.jsx          开始 / 游戏结束遮罩
    └── TouchControls.jsx    移动端方向按钮
```

## 本地开发

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器，访问终端提示的地址
npm run build     # 构建生产产物到 dist/
npm run preview   # 本地预览构建产物
```

## 发布（静态托管）

构建产物在 `dist/` 目录。`vite.config.js` 中 `base: "./"` 使用相对路径，因此 `dist/` 可直接托管在任意平台或子路径下。

### 方式一：GitHub Pages（自动构建，推荐）

仓库已内置工作流 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)，推送到 `main` 分支后会自动构建并部署：

1. 把项目推送到 GitHub。
2. 打开仓库 **Settings → Pages**，**Source** 选择 **GitHub Actions**。
3. 之后每次 `git push` 到 `main`，Actions 会自动 `npm ci && npm run build` 并发布。
4. 部署完成后访问 `https://<用户名>.github.io/<仓库名>/`。

### 方式二：阿里云 OSS 等对象存储

1. 本地执行 `npm run build`。
2. 把 **`dist/` 目录里的所有文件**（不是 dist 文件夹本身）上传到 Bucket 根目录。
3. 注意：OSS 默认域名访问 HTML 会强制下载，需绑定自定义域名才能在浏览器直接打开（海外地域免 ICP 备案）。

### 方式三：Cloudflare Pages / Vercel / Netlify

导入 GitHub 仓库后，按以下设置即可自动构建部署：

- 构建命令：`npm run build`
- 输出目录：`dist`
