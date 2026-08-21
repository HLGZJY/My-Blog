---
title: My-Blog
type: project
date: 2026-08-21
subtitle: 基于 Hexo + Butterfly 的二次元风格个人博客
role: 独立开发
icon: fas fa-blog
order: 3
tone: purple
demo: https://hlgzjy.github.io/My-Blog/
repo: https://github.com/HLGZJY/My-Blog
tech_stack:
  - Hexo
  - Butterfly
  - Markdown
  - GitHub Actions
---

## 项目介绍

本站本身就是一个项目——一个二次元风格的个人技术博客，基于 Hexo 静态站点框架和 Butterfly 主题搭建，部署在 GitHub Pages 上。用来记录学习笔记、展示作品、分享踩坑经验。

## ✨ 核心功能

1. **数据驱动作品集**：作品页通过 YAML 数据 + Pug 模板自动渲染，新增作品只需加一条记录
2. **Live2D 看板娘**：集成 oh-my-live2d 插件和 shizuku 模型，库与模型全部本地化，无外部 CDN 依赖
3. **全站第三方脚本本地化**：FontAwesome、分享、代码高亮等全部打包进站点，国内访问无需外网
4. **一键自动部署**：push 到 main 分支后 GitHub Actions 自动构建发布，约 1 分钟上线
5. **Service Worker 离线缓存**：导航请求网络优先、静态资源缓存优先，提升回访速度与离线体验

## 🧩 开发难点与复盘

> **问题**：Hexo 的子路径部署（`/My-Blog/`）导致看板娘模型路径、静态资源前缀经常出错。
>
> **解决**：统一在 `_config.yml` 配置 `url`/`root`，看板娘 CDN 和模型 `path` 手动补 `/My-Blog/` 前缀。

> **问题**：npmmirror 镜像源会以 451 拒绝分发 Live2D 的 mp3 音效文件（法律原因）。
>
> **解决**：从 unpkg CDN 补充下载音效文件，本地化存放。

后续计划：持续完善作品集内容，考虑加入更多看板娘模型和友链页面。
