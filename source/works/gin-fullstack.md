---
title: Gin-Vue-Admin 全栈实战
type: project
date: 2026-04-13-2026-04-18
subtitle: 基于 Gin-Vue-Admin 的全栈开发实战，实现用户行为追踪与容器化部署
role: 独立开发
icon: fas fa-server
order: 4
tone: blue
repo: https://github.com/HLGZJY/gin-fullstack
tech_stack:
  - Go
  - Gin
  - Vue
  - GORM
  - SQLite
  - Docker
---

## 项目介绍

金山训练营 Web 全栈开发课程 Week06 实战项目，基于 Gin-Vue-Admin 框架，完成数据库切换、用户登录行为追踪、Docker 容器化部署及测试覆盖。

## ✨ 核心功能

1. **SQLite 数据库切换**：通过修改配置文件即可切换数据库类型，GORM AutoMigrate 自动建表
2. **用户登录行为追踪**：记录登录 IP 与时间，前端用户管理列表实时展示
3. **Docker 容器化部署**：多阶段构建 + docker-compose 一键启动前后端服务
4. **输入校验与健壮性增强**：XSS 防护、空值处理、IP 长度限制，登录成功/失败均记录

## 🧩 开发难点与复盘

> **问题**：用户登录追踪需要前后端联调，字段新增后前端表格要同步更新。
>
> **解决**：后端 GORM AutoMigrate 自动扩展字段，前端新增列并实现时间格式化函数，空值友好显示。

> **问题**：Docker 多阶段构建镜像体积优化。
>
> **解决**：后端使用 golang:alpine 编译 + alpine 运行，前端 node:20-slim 构建 + nginx:alpine 部署，静态编译无需 gcc 依赖。

后续计划：补充更多测试用例，探索 CI/CD 自动化部署流程。
