# My-Blog 项目指引

本文件会被代码助手（opencode 等）在每次会话启动时自动加载。

## 一句话概况

二次元风格个人博客，Hexo + Butterfly，部署在 GitHub Pages（https://hlgzjy.github.io/My-Blog/）。

## 开发流程（重要）

- **改什么**：写文章 → `source/_posts/`；加编程项目 → `source/works/` 新建 .md（模板 `scaffolds/project.md`，`tone` 字段定义卡片色调）；加笔记 → `source/_data/works.yml` 的 notes；加相册 → `source/album/`
- **本地预览**：`npx hexo server`（若未 `npm install` 先装依赖），地址 http://localhost:4000/My-Blog/
- **验证**：`npx hexo clean && npm run build`，无报错即可（build = generate + 优化裁剪脚本）
- **发布**：`git push origin main` → GitHub Actions 自动构建部署到 gh-pages（约 1 分钟），最后到线上刷新验证
- 提交信息用中文或英文均可，描述清楚改动即可

## 先读这里

**`PROJECT_LOG.md`** —— 完整的项目续接记录（已完成项、待办、关键文件速查、常见坑）。开始任何改动前先读它。

## 关键约束 / 常见坑（详见 PROJECT_LOG.md）

- 站点有子路径 `/My-Blog/`：**所有 inject 里的静态资源路径必须带 `/My-Blog/` 前缀**（`_config.butterfly.yml` 的 custom.css/sw.js/custom.js 均已修正）；改仓库名后需同步 `_config.yml` 的 `url`/`root` 和看板娘路径前缀
- `themes/butterfly` 是 vendored 提交的（无 .git），主题升级后要保留自建的 `works` 页面组件、`project.pug`、首页入口（`index.pug`）
- `scripts/optimize-site.js` 是构建后优化脚本（裁剪 pluginsSrc + 生成 sw.js），**已在本次补回仓库**；若缺失需重新添加，否则 `npm run build` 会报 MODULE_NOT_FOUND
- 看板娘 shizuku 模型仅限个人/非商业使用（出处见 `source/live2d_models/shizuku/README.md`）
- `preview/` 目录已 gitignore（放截图用，勿提交）
- 第三方脚本已全部本地化，国内可直访；新加依赖优先考虑本地化

## 环境

- Windows + PowerShell；中文文件名/控制台乱码是编码显示问题，实际文件为 UTF-8
- 已安装：git、Node 20、npm 10、Python 3.11、gh CLI（已登录 HLGZJY）
- Chrome 无头可截图但不能读图；预览截图可放 `preview/` 让用户自看