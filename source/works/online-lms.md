---
title: 在线学习管理平台
type: project
date: 2026-03-28-2026-04-01
subtitle: React + Koa 全栈在线学习管理系统，含 JWT 认证、课程/学生管理、Markdown 学习总结
role: 独立开发
icon: fas fa-graduation-cap
order: 4
tone: green
repo: https://github.com/HLGZJY/online-lms
tech_stack:
  - React 19
  - TypeScript
  - Vite
  - Ant Design 6
  - Zustand 5
  - react-i18next
  - Koa 2
  - SQLite
---

## 项目介绍

一个面向师生的在线学习管理平台，前端 React + 后端 Koa 全栈实现。支持 JWT 登录认证、课程管理、学生管理、Markdown 学习总结编辑等功能，采用玻璃态 UI 设计，支持中英文国际化。

## ✨ 核心功能

1. **JWT 登录认证**：Token 存储于 Zustand Store，Axios 拦截器自动注入，路由守卫保护受保护页面
2. **Dashboard 数据看板**：4 个统计卡片 + 4 个 Recharts 图表，玻璃态毛玻璃 UI 设计
3. **课程 / 学生 CRUD**：Ant Design Table + Drawer 表单，支持筛选搜索、状态切换、分组 Checkbox 选课
4. **Markdown 学习总结**：react-md-editor Obsidian 风格编辑，悬停/聚焦切换编辑模式，debounce 自动保存
5. **中英文国际化**：react-i18next 6 命名空间 × 2 语言，Zustand 语言状态与 i18next 双向同步

## 🧩 开发难点与复盘

> **问题**：Context API 多 Context 嵌套导致"嵌套地狱"，状态管理混乱。
>
> **解决**：迁移到 Zustand 单一 Store + Slice 模式，使用 Immer 中间件和 persist 中间件，状态管理更清晰。

> **问题**：Axios 响应数据被多层包装（`res.data.data`），访问路径冗余。
>
> **解决**：添加 response interceptor 直接返回 `response.data`，前端类型安全且简洁。

> **问题**：Markdown 编辑器中相对路径图片无法在浏览器中显示。
>
> **解决**：通过 `urlTransform` 属性精确区分内部/外部资源，仅对相对路径添加 `/api/static/` 前缀。

> **问题**：保存学习总结时后端返回 405 Method Not Allowed。
>
> **解决**：排查发现后端只实现了 GET 路由，忘记添加 PUT 路由处理函数——RESTful API 要实现完整的 CRUD。

后续计划：优化推荐算法、接入更多课程资源、考虑加入实时通知推送。
