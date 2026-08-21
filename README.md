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

### 加作品（编程项目）

在 `source/works/` 下新建一个 Markdown 文件（复制 `scaffolds/project.md` 模板），frontmatter 设 `type: project`，作品集页会自动生成卡片：

```markdown
---
title: 项目名
type: project
date: 2025-08-25-2026-05-09   # 单日期 2023-12-15 或区间「年月日-年月日」均可
subtitle: 一句话简介
role: 独立开发
icon: fas fa-laptop-code
order: 1                      # 数字越小排越前
tone: blue                    # 卡片色调（可选）：blue/beige/purple/green，见下表
demo: https://example.com     # 可选，卡片右下角外链
repo: https://github.com/xxx  # 可选，卡片右下角 GitHub
tech_stack:
  - Vue3
  - TypeScript
---

正文（项目介绍 / 核心功能 / 踩坑复盘）...
```

> 日期区间写法：`2025-08-25-2026-05-09`（年-月-日-年-月-日，中间两个连字符），卡片显示 `2025.08 – 2026.05`，详情页显示 `2025-08-25 ~ 2026-05-09`。

**卡片色调 `tone`**（在每篇文章的 front matter 里定义，决定该卡片底色/图标/标签/「查看详情」的色相，缺省为柔粉灰）：

| tone | 底色（HSL） | 视觉调性 | 示例 |
|---|---|---|---|
| `blue` | `hsl(215,15%,96%)` | 柔蓝灰 · 专业科技 | 校易通 |
| `beige` | `hsl(40,10%,95%)` | 暖米灰 · 朴实稳重 | 教师管理系统 |
| `purple` | `hsl(270,10%,96%)` | 淡紫灰 · 创意二次元 | My-Blog |
| `green` | `hsl(150,8%,96%)` | 极浅绿灰 · 轻松补充 | 文章/笔记 |

配色原则：主色（中性柔灰）承载正文，辅助色（低饱和冷暖）区分卡片，强调色（中饱和中明度）只用于「查看详情」文字与关键标签——避免高饱和深粉造成的视觉冲击。

### 加笔记 / 文章

编辑 `source/_data/works.yml` 的 `notes` 列表，加一条即可：

### 加相册

- 在 `source/album/index.md` 复制一行 `galleryGroup` 修改名称/链接/封面
- 新建对应子页面（如 `source/album/xxx/index.md`），正文用 `{% gallery %}` 包裹图片链接

## 已实现功能

- 二次元配色（樱花粉 + 青蓝）、圆角卡片、悬停动效
- 首页打字机字幕（typewriter）
- **首页作品集入口横幅**（自动统计项目/笔记数量，一键进入 `/works/`）
- 作品集页（`/works/`，数据驱动，卡片色调由每篇文章的 `tone` 字段定义）
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
├── scaffolds/              # 文章/项目模板（project.md 里说明了 date 区间写法）
├── source/
│   ├── _posts/             # 文章（写在这里）
│   ├── _data/works.yml     # 作品集数据（notes 列表）
│   ├── works/              # 作品集页 + 每个编程项目一个 .md
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
- `themes/butterfly/layout/index.pug` 中加入了首页作品集入口横幅，升级主题时需保留
- 配置优先使用根目录 `_config.butterfly.yml`，升级主题后如有新增配置项可对照合并

## 自定义提示

- 改主题色：编辑 `source/css/custom.css` 里的 `--btn-bg`、`--theme-color` 等变量
- 改看板娘：编辑 `_config.yml` 的 `OhMyLive2d` 配置（模型放在 `source/live2d_models/`）
- 改仓库名后：同步修改 `_config.yml` 里的 `url`/`root` 和看板娘路径的 `/My-Blog/` 前缀