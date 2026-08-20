# My-Blog 🎐

二次元风格的个人博客，基于 **Hexo + Butterfly 主题**，部署在 GitHub Pages。

线上地址：https://hlgzjy.github.io/My-Blog/

## 快速开始

### 本地预览

```bash
npm install          # 首次需要
npx hexo server      # 打开 http://localhost:4000/My-Blog/
```

### 发文章（三步）

1. 在 `source/_posts/` 下新建 Markdown 文件，头部写 frontmatter：

```markdown
---
title: 文章标题
date: 2026-08-20
tags:
  - 分类标签
categories:
  - 分类名
comments: true
cover: false   # 可填封面图路径
---

正文内容...
```

2. `git add . && git commit -m "新文章"`
3. `git push origin main` → GitHub Actions 自动构建并部署，约 1 分钟后上线

### 加作品

编辑 `source/_data/works.yml`，在 `projects` 或 `notes` 列表里加一条即可：

```yaml
projects:
  - name: 项目名
    url: https://github.com/你/项目    # 外链或站内链接
    description: 一句话简介
    icon: fab fa-github                 # Font Awesome 图标，可省略
    tags: [JavaScript, 前端]
```

### 加相册

- 在 `source/album/index.md` 复制一行 `galleryGroup` 修改名称/链接/封面
- 新建对应子页面（如 `source/album/xxx/index.md`），正文用 `{% gallery %}` 包裹图片链接

## 已实现功能

- 二次元配色（樱花粉 + 青蓝）、圆角卡片、悬停动效
- 首页打字机字幕（typewriter）
- 作品集页（`/works/`，数据驱动）
- 相册页（`/album/`）、关于页、标签页、分类页
- 明暗模式切换、本地搜索（全文搜索）
- giscus 评论（GitHub Discussions，简体中文）
- Live2D 看板娘（免费模型，全本地化，无 CDN 依赖）
- 点击页面出现爱心/粒子特效
- 第三方脚本全部本地化（`pluginsSrc`），国内访问无需翻墙

## 目录结构

```
My-Blog/
├── _config.yml             # 站点配置（标题/作者/URL/看板娘）
├── _config.butterfly.yml   # 主题配置（颜色/菜单/评论/特效）
├── .github/workflows/      # 自动部署工作流
├── scaffolds/              # 文章模板
├── source/
│   ├── _posts/             # 文章（写在这里）
│   ├── _data/works.yml     # 作品集数据
│   ├── works/              # 作品集页
│   ├── about/              # 关于页
│   ├── album/              # 相册页
│   ├── css/custom.css      # 自定义样式（改配色在这里）
│   ├── js/custom.js        # 点击特效等
│   ├── live2d_models/      # 看板娘模型（本地）
│   └── oml2d/              # 看板娘运行库（本地）
└── themes/butterfly/       # Butterfly 主题（含自建 works 页面布局）
```

## 主题升级注意

- `themes/butterfly/layout/page.pug` 中添加了 `works` 页面分支，升级主题时需保留
- `themes/butterfly/layout/includes/page/works.pug` 是作品集组件
- 配置优先使用根目录 `_config.butterfly.yml`，升级主题后如有新增配置项可对照合并

## 自定义提示

- 改主题色：编辑 `source/css/custom.css` 里的 `--btn-bg`、`--theme-color` 等变量
- 改看板娘：编辑 `_config.yml` 的 `OhMyLive2d` 配置（模型放在 `source/live2d_models/`）
- 改仓库名后：同步修改 `_config.yml` 里的 `url`/`root` 和看板娘路径的 `/My-Blog/` 前缀