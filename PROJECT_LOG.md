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

## 二·六、调色师配色体系 + 首页作品集入口（2026-08-21）

1. **每卡片色调在文章 front-matter 定义**：新增 `tone` 字段（blue/beige/purple/green/default），`works.pug` 输出 `data-tone`，CSS 用 `--tone-h` 色相变量驱动整套卡片配色（底色/图标/标签/角色点/「查看详情」）。
   - 校易通 `tone: blue`（柔蓝灰科技）、教师系统 `tone: beige`（暖米灰稳重）、My-Blog `tone: purple`（淡紫灰创意）、笔记 `tone: green`（极浅绿灰）。
2. **配色原则（调色师方案）**：主色中性柔灰承载正文、辅助色低饱和冷暖区分卡片、强调色中饱和中明度只用于关键操作；「查看详情」从高饱和深粉按钮改为**柔色文字 + 箭头**（方案 A，饱和度 ≤ 40%），不再扎眼。
3. **首页作品集入口**：`themes/butterfly/layout/index.pug` 加横幅组件（自动统计项目/笔记数 + 「进入作品集 →」按钮），样式在 `custom.css`（.home-works-entry*）。
4. **视觉层级**：标题/日期（深灰加粗）→ 卡片底色微色相 → 技术栈标签（低饱和）→ 查看详情（柔色）。
5. **文档同步**：`scaffolds/project.md`、`README.md`（tone 色值表 + 首页入口说明）已更新。

## 二·五、作品集视觉增强 + 日期区间修复（2026-08-21）

1. **作品集卡片视觉升级**：`works.pug` 卡片重做，新增图标渐变徽标、角色标注、技术栈标签、右下角「查看详情」渐变 CTA 按钮 + 仓库/演示外链图标，hover 有抬升 + 图标旋转 + 箭头位移动效，告别单调。
2. **修复日期区间显示 bug**：`date: 2025-08-25-2026-05-09` 这类「区间」写法会被 Hexo 解析失败，改写为**文件修改时间**（如 2026-08-21），导致卡片/详情页显示错误日期。
   - 根治：模板不再用被改写的 `page.date`，改为读取原始 front-matter（`page.raw`）正则还原 `date` 字段字符串，再按 6 段「年月日-年月日」识别为区间格式化。
   - 效果：卡片 `2025.08 – 2026.05`，详情页 `2025-08-25 ~ 2026-05-09`；单日期不受影响。
   - 涉及：`themes/butterfly/layout/includes/page/works.pug`、`.../project.pug`。
3. **卡片排序改为按 `order` 升序**（数字越小越靠前，缺省 9999 排最后），不再依赖会被区间日期污染的 `sort('-date')`。
4. **模板踩坑**：Pug 的 `each` 头**不能**内联 `.filter().sort()` 链式调用（语法错误），必须先 `- var projects = ...` 在代码块里算好数组再 `each`。
5. **文档同步**：`scaffolds/project.md` 注明两种 date 写法；`README.md` 更新「加作品」为 `source/works/*.md` 流程 + 日期区间说明。

## 二·七、关键 bug 修复（2026-08-21，随本次改动一并发现）

1. **custom.css 从未生效（子路径 404）**：`_config.butterfly.yml` 的 `inject.head` 里 `<link href="/css/custom.css">` **缺少 `/My-Blog/` 前缀**，导致样式 404、全站自定义 CSS 一直没加载。已改为 `/My-Blog/css/custom.css`。这也解释了为什么改卡片样式「看起来没用」——先确认这个前缀。
2. **`scripts/optimize-site.js` 缺失**：`package.json` 的 build 引用它但仓库里没有该文件，`npm run build` 报 `MODULE_NOT_FOUND`，CI 会挂。已按 `OPTIMIZATION.md` 描述重建：配置驱动 denylist 裁剪 pluginsSrc（本次裁 11 个目录、释放约 2.6 MB）+ 生成 `public/sw.js`（118 项缓存）。注意：文件**不能带 shebang 行**（Hexo 会把 scripts/ 下文件当插件加载，shebang 导致 SyntaxError）。
3. **Pug 陷阱**：`each` 头不能内联 `.filter().sort()` 链式表达式（SyntaxError），须先在 `-` 代码块算出数组。

## 三、待办 / 可继续做的事

- [ ] 填写真实的作品集内容（`source/_data/works.yml` 的 notes 目前还是示例卡片）
- [ ] 替换相册占位图（`source/album/` 用的是占位 SVG）
- [ ] 写自己的真实文章（`source/_posts/`）
- [ ] 可选：自定义域名 / 友链页 / 音乐页 / 更多看板娘模型
- [ ] 可选：加一个 `关于页` 的头像说明和社交图标

## 四、关键文件速查

| 文件 | 作用 | 想改什么去这里 |
|---|---|---|
| `_config.yml` | 站点级配置 + 看板娘 | 标题/作者/URL/看板娘模型 |
| `_config.butterfly.yml` | 主题配置 | 菜单/评论/搜索/特效开关 |
| `source/css/custom.css` | 自定义样式 | 主题色、卡片圆角、作品集卡片样式（含编程项目卡视觉增强） |
| `source/js/custom.js` | 自定义 JS | 点击爱心特效 |
| `source/_data/works.yml` | 作品集数据 | 加笔记（notes 列表） |
| `source/works/` | 作品集页 + 编程项目 | 每个编程项目一个 .md（type: project，模板见 scaffolds/project.md，date 支持单日期或区间） |
| `source/_posts/` | 文章目录 | 写新文章 |
| `themes/butterfly/layout/includes/page/works.pug` | 作品集组件 | 改作品集卡片排版（项目卡+笔记卡 mixin；日期区间读取 page.raw 解析；tone 输出 data-tone） |
| `themes/butterfly/layout/includes/page/project.pug` | 项目详情页 | 改详情页头部/日期/按钮（同样兼容日期区间） |
| `themes/butterfly/layout/index.pug` | 首页布局 | 首页作品集入口横幅（自建，升级主题需保留） |
| `.github/workflows/deploy.yml` | 自动部署 | 部署流程（CI 使用 `npm run build` 触发优化裁剪） |
| `scripts/optimize-site.js` | 构建后优化 | 按「禁用功能」名单裁剪未启用的第三方脚本 + 生成 Service Worker |
| `public/sw.js`（构建生成，勿手改） | Service Worker | 缓存策略：导航网络优先 / 静态资源缓存优先，提升回访与离线体验 |

## 五、本地常用命令

```bash
npm install            # 首次 / 依赖变动后
npx hexo clean && npm run build        # 重新构建（generate + 优化裁剪脚本 scripts/optimize-site.js）
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