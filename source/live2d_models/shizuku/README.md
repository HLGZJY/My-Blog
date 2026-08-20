# shizuku 蓝发少女（看板娘模型）

## 来源

- 模型：`shizuku`，经典 Live2D 看板娘模型
- 原始出处：fghrsh 的 live2d-widget / live2d_api 系列模型（https://github.com/fghrsh/live2d_api ）
- 本次获取：`oml2d-models` 静态资源包（npmmirror 镜像）中的 `models/shizuku` 目录；音效 mp3 取自 npm 包 `live2d-widget-model-shizuku`（unpkg）

## 使用协议

- 该模型为**免费看板娘模型**，作者（fghrsh 等）允许用于**个人博客 / 非商业用途**
- **禁止用于任何商业盈利项目**
- 模型版权归原作者所有，仅供个人学习与展示
- 详见原始仓库声明：https://github.com/fghrsh/live2d_api

## 本地文件说明

本目录为模型完整资源（已本地化，不依赖任何 CDN）：

```
shizuku.model.json   # 模型配置文件（入口）
shizuku.moc          # 模型数据
shizuku.1024/        # 6 张贴图
expressions/         # 4 个表情
motions/             # 21 个动作（idle/tapBody/pinch/shake/flickHead）
sounds/              # 15 个音效（点击/捏/甩头）
shizuku.physics.json # 物理效果
shizuku.pose.json    # 姿态
```

## 更换模型

如需更换，将新模型完整放入 `source/live2d_models/` 下某目录，并把 `_config.yml` 中 `OhMyLive2d.option.models[].path` 改为 `/My-Blog/live2d_models/<目录>/<入口json>` 即可。