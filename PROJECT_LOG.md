# 项目续接记录 PROJECT_LOG.md

> 给「下一位开发者 / 未来的自己」的交接文档。
> 记录：当前进度、已完成项、待办项、常见问题、如何继续。

## 一、项目概况

| 项 | 值 |
|---|---|
| 仓库 | https://github.com/HLGZJY/My-Blog |
| 线上地址 | https://hlgzjy.github.io/My-Blog/ |
| 技术栈 | Hexo 8 + Butterfly 5.7.0（Python/MkDocs 旧栈已移除） |
| 部署方式 | GitHub Actions → push main 自动构建发布到 gh-pages |
| 语言 | 简体中文（zh-CN） |
| 作者/昵称 | Ariey（GitHub 头像 logo.jpg 复用为站点 logo） |

## 二、已完成的改造（2026-08-21）

1. **技术栈迁移**：MkDocs → Hexo + Butterfly，保留 git 历史，重写 main 分支内容
2. **站点配置**：`_config.yml`（简中、作者 Ariey、`url/root = /My-Blog/`）
3. **主题配置**：`_config.butterfly.yml`（二次元粉蓝配色、菜单、明暗模式、本地搜索、giscus 评论 zh-CN）
4. **作品集页** `/works/`：数据驱动（`source/_data/works.yml`），自定义 `works.pug` 布局渲染卡片，分「编程项目」「文章/笔记」两区
5. **页面**：首页 / 作品集 / 归档 / 分类 / 标签 / 相册（含 壁纸·日常 两个子相册）/ 关于
6. **Live2D 看板娘**：oh-my-live2d 插件 + **shizuku 蓝发少女**模型，库与模型**全部本地化**（`source/oml2d/`、`source/live2d_models/shizuku/`），无外部 CDN
7. **点击爱心特效**：自写 `source/js/custom.js`，不依赖 CDN
8. **第三方脚本本地化**：安装 `hexo-butterfly-extjs`，`third_party_provider: local`，FontAwesome/分享/高亮等全部打进 `pluginsSrc`，国内访问无需外网
9. **自动部署**：`.github/workflows/deploy.yml`（已验证线上正常）
10. **文章**：删除了旧的 hello-world，写了一篇《欢迎来到我的小站》开篇文章
11. **README**：写明「发文章 / 加作品 / 加相册」三步编辑流程
12. **AGENTS.md**：新会话自动加载的入口，指向本记录

## 三、待办 / 可继续做的事

- [ ] 填写真实的作品集内容（`source/_data/works.yml` 目前是示例卡片）
- [ ] 替换相册占位图（`source/album/` 用的是占位 SVG）
- [ ] 写自己的真实文章（`source/_posts/`）
- [ ] 可选：自定义域名 / 友链页 / 音乐页 / 更多看板娘模型
- [ ] 可选：加一个 `关于页` 的头像说明和社交图标

## 四、关键文件速查

| 文件 | 作用 | 想改什么去这里 |
|---|---|---|
| `_config.yml` | 站点级配置 + 看板娘 | 标题/作者/URL/看板娘模型 |
| `_config.butterfly.yml` | 主题配置 | 菜单/评论/搜索/特效开关 |
| `source/css/custom.css` | 自定义样式 | 主题色、卡片圆角、作品集卡片样式 |
| `source/js/custom.js` | 自定义 JS | 点击爱心特效 |
| `source/_data/works.yml` | 作品集数据 | 加作品（编程项目/笔记） |
| `source/_posts/` | 文章目录 | 写新文章 |
| `themes/butterfly/layout/includes/page/works.pug` | 作品集组件 | 改作品集卡片排版 |
| `.github/workflows/deploy.yml` | 自动部署 | 部署流程 |

## 五、本地常用命令

```bash
npm install            # 首次 / 依赖变动后
npx hexo clean && npx hexo generate   # 重新构建（生成到 public/）
npx hexo server        # 本地预览 http://localhost:4000/My-Blog/
npm run deploy         # （本地部署，本项目一般用 CI，不需要）
```

## 六、常见坑与注意

1. **改仓库名**后必须同步：`_config.yml` 的 `url`、`root`，以及看板娘路径的 `/My-Blog/` 前缀（`OhMyLive2d.CDN` 和模型 `path`）。
2. **主题升级**（`themes/butterfly` 是直接 vendored 提交的，无 .git）：升级后需把 `page.pug` 里的 `works` 分支和 `includes/page/works.pug` 重新加回来；根目录 `_config.butterfly.yml` 如有新增配置项，对照主题 `_config.yml` 合并。
3. **giscus 评论**需要仓库开启 Discussions 且配置了 Announcements 分类（旧站已配好，repo_id/category_id 已填入主题配置）。
4. **预览截图**：构建时可用 `preview/` 文件夹放截图（已被 .gitignore，不会提交）。
5. 本地无脑测：直接 `npx hexo server` 后开 http://localhost:4000/My-Blog/ 看效果，改完配置 `Ctrl+C` 重跑 `hexo clean && hexo generate && hexo server`。
6. **看板娘模型来源**：shizuku 来自 fghrsh 经典系列，仅限**个人/非商业**使用，出处与协议见 `source/live2d_models/shizuku/README.md`。npmmirror 会以 451 拒发 mp3 音效（法律原因），需从 unpkg 补。
7. **Actions 有个 Node 20 弃用告警**（`actions/checkout@v4`/`setup-node@v4`），目前不影响构建；后续可把 `node-version` 提到 24。

## 七、下一步建议（如果继续开发）

1. 把 `source/_data/works.yml` 换成自己的真实项目（GitHub 链接 + 简介 + 技术栈）
2. 用 `npx hexo new post "文章名"` 写第一篇技术笔记，体验「push 即发布」流程
3. 有好看的头图后，把 `source/img/album/` 的占位图换掉，并给文章配封面
4. 改完 push main 后，等 Actions 绿勾（约 1 分钟）再到线上刷新验证