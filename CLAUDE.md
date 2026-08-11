## 上下文管理规则

- 每次开始新会话时，先调用 context_auto_load 恢复项目上下文
- 重要架构决策保存到 architecture 分类，priority 设为 high
- 遇到并解决的 Bug，保存到 error 分类
- 每次开发结束前，调用context_save将相关架构保存到 architecture 分类，同时保存当前进度到 progress 分类
- 使用 tags 标注涉及的技术栈（如 react、database、auth）
- 文件较大时主动调用 context_compress 压缩
