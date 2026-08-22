---
title: 灵犀 AI 对话助手
type: project
date: 2026-03-14-2026-03-19
subtitle: 仿 WPS 灵犀风格的 AI 聊天助手，纯原生前端实战项目
role: 独立开发
icon: fas fa-robot
order: 2
tone: purple
repo: https://github.com/HLGZJY/lingxi
tech_stack:
  - HTML5 + CSS + JavaScript（原生，无框架）
  - marked.js（Markdown 解析）
  - Prism.js（代码高亮）
  - 阿里云百炼 DashScope（qwen3.5-flash）
  - localStorage（配置持久化）
---

## 项目介绍

一个仿 WPS 灵犀风格的 AI 对话助手，前端学习路上的实战项目。使用**纯原生 HTML + CSS + JavaScript** 实现，无任何框架依赖，真实接入大模型 API，支持流式输出、Markdown 渲染、多模态图片理解与主题切换。

## ✨ 核心功能

1. **流式 AI 对话**：接入阿里云百炼 API（OpenAI 兼容模式），支持 SSE 流式输出与打字机效果，可中断生成
2. **Markdown 实时渲染**：流式输出过程中边接收边解析，支持代码块语法高亮、一键复制、语言标签显示
3. **多模态图片理解**：支持上传最多 9 张图片（单张 ≤ 4MB），以 base64 形式随消息发送，支持纯图片提问
4. **深/浅色主题切换**：一键切换，偏好本地持久化，图标联动变化
5. **零构建零依赖**：浏览器直接打开 `index.html` 即可运行，适合学习原生前端与 API 对接

## 🧩 开发难点与复盘

> **问题**：流式输出时每次收到内容都解析 Markdown 会导致频繁重绘，性能差且体验不好。
>
> **解决**：引入 10ms 防抖渲染，等内容稳定后再统一解析，显著提升流式输出体验。

> **问题**：`marked` v15 与 `marked-highlight` 插件不兼容，语法高亮方案受阻。
>
> **解决**：改用本地化 `Prism.js`，手动遍历代码块完成高亮、包装 header、添加复制按钮与语言标签。

> **问题**：请求中断功能如何实现？
>
> **解决**：使用浏览器原生 `AbortController`，配合 `fetch` 的 `signal` 选项，一行代码实现生成中断。

后续计划：添加消息撤回、支持更多文件类型上传、会话管理（多会话切换）、对话历史持久化与导出、补充界面截图。