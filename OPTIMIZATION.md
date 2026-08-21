# My-Blog 网站优化方案与实现要点

> 面向 Hexo 8 + Butterfly 5.7.0 二次元个人博客的全方位优化。
> 目标：提升加载速度、改善 UI 与交互、理顺代码结构，同时**保持原有核心功能与内容结构不变**。
> 优化已落地并通过 `npm run build` 验证。

---

## 一、优化成效（实测）

| 指标 | 优化前 | 优化后 | 说明 |
|---|---|---|---|
| `public/pluginsSrc` | 8.7 MB / 52 文件 | **773 KB / 31 文件** | 删除未启用的第三方脚本 |
| `public` 总体积 | 18 MB | **9.1 MB** | 部署包近乎减半 |
| 首屏外图片 | 即时加载 | **原生懒加载** (`loading='lazy'`) | 45 张图全部生效 |
| 站内跳转 | 整页刷新 | **instant.page 预取** | 悬停即预载，秒开 |
| 评论区 | 随文加载 | **giscus 懒加载** | 滚动到评论区才加载 |
| 回访/离线 | 无缓存 | **Service Worker 缓存** | HTML 网络优先、静态资源缓存优先 |
| 移动端地址栏 | 默认灰 | **theme-color 主题色** | 二次元粉蓝一体感 |

> 注：`live2d_models`(6.6MB) 与 `oml2d`(980KB) 为看板娘功能固有体积，属刻意保留的「萌点」，不在裁剪范围。

---

## 二、性能优化

### 2.1 图片懒加载（原生，零 JS 成本）
- 文件：`_config.butterfly.yml`
- 改动：`lazyload.enable: true` + `lazyload.native: true`
- 要点：使用浏览器原生 `loading='lazy'`，无额外库；首屏外图片（头像、相册、文章配图）延迟加载，降低 LCP 与带宽。
- 验证：生成后 45 个 `<img>` 均带 `loading='lazy'`。

### 2.2 第三方脚本冗余裁剪（最大减重项）
- 文件：`scripts/optimize-site.js`（构建后脚本，`npm run build` 自动执行）
- 问题：`hexo-butterfly-extjs` 把整包插件拷进 `pluginsSrc`，含大量**已禁用功能**的脚本（mermaid 3.5MB、mathjax 1MB、gitalk/twikoo/valine/waline/artalk/abcjs/chartjs/docsearch/fancybox…），虽不被页面加载，却随部署上传、膨胀 gh-pages 分支。
- 方案：**配置驱动 denylist**——读取 `_config.butterfly.yml`，仅裁剪「明确对应已关闭功能」的插件文件夹，且要求该文件确实未被任何 HTML/CSS 引用。
- 安全兜底：启用中的功能（打字机 `typed.js`、相册 `infinitegrid`、分享 `sharejs`、FontAwesome、katex 字体、`instant.page`）**绝不删除**；初始实现曾误删 `typed.js`/`infinitegrid`，已修正为 denylist 策略。
- 成效：释放 8.16 MB。

### 2.3 缓存策略（Service Worker / PWA）
- 文件：`scripts/optimize-site.js` 生成 `public/sw.js`；`_config.butterfly.yml` 的 `inject.head` 注册。
- 策略：
  - 导航请求（HTML）：**网络优先**，保证内容永远最新；失败才回退缓存（离线可读）。
  - 静态资源（css/js/字体/图片/音频）：**缓存优先**，二次访问秒开。
  - 每次构建写入带时间戳的缓存名，自动失效旧缓存。
- 作用域：`/My-Blog/`（适配 GitHub Pages 子路径）。

### 2.4 站内跳转加速
- `instantpage: true`：约 1KB 脚本，悬停/进入视口即预取链接，站内跳转近乎瞬时。

### 2.5 评论区懒加载
- `comments.lazyload: true`（giscus）：评论 iframe 进入视口才加载，文章页更轻。

### 2.6 搜索数据按需加载
- `search.local_search.preload: false`：仅在打开搜索框时请求 `search.xml`，避免每页无谓下载。

### 2.7 看板娘（Live2D）说明
- `oml2d/index.min.js`(1MB) 在 `</body>` 前加载，已位于文档末尾，**不阻塞首屏渲染**（上方内容先绘制）。
- 移动端已设 `mobileDisplay: false`，仅桌面加载。如仍想进一步减负，可改为 `requestIdleCallback` 空闲加载，本项目暂保持原样。

---

## 三、前端 UI 优化

### 3.1 移动端主题色
- `theme_color` 启用：粉蓝配色（`#ff7eb3` 等），移动端浏览器地址栏与 PWA 一体感更强。

### 3.2 固定导航栏
- `nav.fixed: true`：滚动时导航常驻，跨页浏览更顺手（Butterfly 原生支持，无视觉回归）。

### 3.3 滚动进度与锚点交互
- `rightside_scroll_percent: true`：右下角按钮显示阅读进度。
- `anchor.auto_update: true` + `anchor.click_to_scroll: true`：文章内锚点点击平滑滚动、URL 自动同步。

### 3.4 已有视觉资产（保持）
- 渐变顶栏、圆角卡片、悬停微动效、粉蓝滚动条、作品集卡片渐变描边等（`source/css/custom.css`）均保留未动。

### 3.5 响应式
- Butterfly 本身响应式完善；本次未改动断点逻辑，确保桌面/移动端布局稳定。

---

## 四、代码结构优化

### 4.1 作品集组件重构为 mixin
- 文件：`themes/butterfly/layout/includes/page/works.pug`
- 改动：将 `projects` / `notes` 两段近乎相同的渲染逻辑抽成 `workCard(item)` 与 `workSection(icon,title,items)` 两个 mixin。
- 收益：新增分区（如「设计」「翻译」）只需再调用一次 `+workSection`，**输出 HTML 结构完全一致**，可维护性/复用性提升。

### 4.2 构建期优化脚本化
- 文件：`scripts/optimize-site.js`
- 设计：作为**独立脚本**（`node scripts/optimize-site.js`），由 `npm run build` 在 `hexo generate` 之后执行。
- 为何不用 `after_generate` 钩子：在 `generate` 过程中删除 `pluginsSrc` 文件会触发 Hexo 增量重建循环（文件被重新拷贝回来）。后置执行彻底规避该问题，且带 `require.main` 守卫，被 Hexo 当插件加载时不误执行。

### 4.3 配置集中、流程一致
- `package.json`：`build` = `hexo generate && node scripts/optimize-site.js`
- `.github/workflows/deploy.yml`：CI 改为 `npx hexo clean && npm run build`，本地与线上构建行为一致。
- `AGENTS.md` / `PROJECT_LOG.md`：同步新命令与新增文件说明。

---

## 五、实施要点与注意事项

1. **启用某项被裁剪的功能时**：若日后开启 mermaid / mathjax / 评论系统 / 灯箱等，脚本会按配置自动保留对应插件，**无需手动干预**；但需重新 `npm run build` 让裁剪逻辑重新计算。
2. **Service Worker 更新**：每次部署缓存名带时间戳，浏览器在下次访问时自动更新缓存；若怀疑缓存陈旧，访客可硬刷新（Ctrl+F5）。
3. **不要手改 `public/sw.js`**：它由脚本生成，每次构建覆盖。
4. **保持功能不变**：文章、作品集、相册、关于页、看板娘、点击爱心特效、本地搜索、giscus 评论均未改动。
5. **本地预览**：`npx hexo server`（注意 `sw.js` 仅在 `npm run build` 产物中存在，本地 server 不会自动裁剪/生成，但不影响预览）。

---

## 六、可继续深化的方向（可选）

| 方向 | 做法 | 收益 |
|---|---|---|
| HTML 压缩 | 接入 `hexo-html-minifier` / `gulp` 构建链 | 减少传输体积 |
| 图片压缩 | 将相册/配图转 WebP + 压缩（如 `sharp`） | 进一步降体积 |
| 预连接 | `<link rel="preconnect">` 指向 giscus.app 等外部域 | 减少握手延迟 |
| Critical CSS | 内联手首屏关键 CSS | 提升 FCP |
| 资源 CDN | 视访问群体启用 jsDelivr（国内仍建议本地化） | 并行加载 |

---

*生成日期：2026-08-21 ｜ 已通过 `npm run build` 验证，构建无报错，启用功能资源均保留。*
