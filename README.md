# 贪吃蛇 Snake

一个纯静态、单文件的 HTML 贪吃蛇小游戏，零依赖、无需构建，适合部署到 [Zeabur](https://zeabur.com) 测试学习。

## 玩法

- 桌面端：方向键 `↑ ↓ ← →` 或 `W A S D` 控制方向。
- 移动端：在画面上滑动，或点击屏幕下方的方向按钮。
- 吃到食物加分（每个 +10），蛇身变长、速度略微加快。
- 撞到墙壁或自己的身体则游戏结束。
- 最高分会保存在浏览器 `localStorage` 中。

## 本地预览

直接双击 `index.html` 即可在浏览器中打开；或启动一个本地服务器：

```bash
# Python 3
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 Zeabur

1. 将本目录推送到 GitHub 仓库。
2. 登录 Zeabur，新建项目并选择 **Deploy from GitHub**，导入该仓库。
3. Zeabur 会根据 `zbpack.json`（`output_dir: "."`）将其识别为**静态站点**并自动部署。
4. 部署完成后在服务设置中绑定域名即可访问。

## 文件说明

- `index.html` — 游戏主体，结构、样式、脚本全部内联。
- `zbpack.json` — Zeabur 构建配置，指定静态输出目录。
- `README.md` — 本说明文档。
