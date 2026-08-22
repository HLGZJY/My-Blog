---
title: 服务健康探测器
type: project
date: 2026-04-06-2026-04-11
subtitle: 高性能 Go CLI 工具，用于并发探测多个网络目标的健康状况
role: 独立开发
icon: fas fa-heartbeat
order: 3
tone: blue
repo: https://github.com/HLGZJY/monitor
tech_stack:
  - Go
  - 并发编程
  - TCP/HTTP
  - 单元测试
---

## 项目介绍

一个高性能 Go CLI 工具，用于并发探测多个网络目标的健康状况。支持 TCP 端口探测和 HTTP 状态码检测，采用 goroutine 并发引擎提升探测效率，生成可视化报表输出结果。

## ✨ 核心功能

1. **TCP/HTTP 双协议探测**：支持 TCP 端口连通性检测和 HTTP 状态码验证，覆盖常见网络服务健康检查场景
2. **goroutine 并发引擎**：使用 WaitGroup + Mutex 实现安全高效的并发探测，显著缩短批量检测时间
3. **智能重试机制**：可配置重试次数和超时时间，自动处理网络波动导致的临时失败
4. **可视化报表生成**：中英文视觉对齐的表格输出，支持摘要行和详情行分离，长 URL 不会撑开列宽
5. **完善的测试覆盖**：38 个单元测试用例，覆盖配置解析、探测逻辑、报表生成等核心模块

## 🧩 开发难点与复盘

> **问题**：多个 goroutine 同时写入共享的 `results` 切片会发生竞态条件，导致数据混乱。
>
> **解决**：使用 `sync.Mutex` 互斥锁保护共享数据，确保同一时刻只有一个 goroutine 能写入结果。

> **问题**：Go 的 `internal` 包只能被父包及其子包访问，外部测试文件无法导入。
>
> **解决**：将测试文件放在同包目录下（如 `internal/config/config_test.go`），与源代码放在一起。

> **问题**：报表中长 URL 会撑开表格列宽，中英文混合时对齐错乱。
>
> **解决**：分离"摘要行"和"详情行"，使用 `padRight`/`truncate` 函数按视觉宽度处理中英文对齐。

## 🔗 相关链接

- 源码仓库：[https://github.com/HLGZJY/monitor](https://github.com/HLGZJY/monitor)
