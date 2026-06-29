# 博客写作技能提炼总览

本文档包提炼自三个参考项目：

- `anthropics/skills`，commit `3541475`
- `VoltAgent/awesome-agent-skills`，commit `934b1e8`
- `AgriciDaniel/claude-blog`，commit `49842ea`

目标不是照搬一套重型博客生产系统，而是把其中对本博客有用的技能、流程和 prompt 拆出来，作为后续筛选、改写、安装成 Skill 或写进 `BLOG_AGENT.md` 的候选库。

## 适合本博客的取舍

本博客现在更像“视觉笔记 / 技术说明页”，不是营销 SEO 站。因此优先保留：

- 技能入口路由：先判断任务类型，再读少量相关材料。
- 写作前 brief：把目标读者、结论、素材、结构先定清楚。
- 研究质量：区分权威资料、实践讨论、个人经验和待验证信息。
- 答案优先：每个信息块先给结论，再给原因、例子或操作。
- 审稿清单：检查事实、结构、敏感信息、模板占位和发布状态。
- 可复用 prompt：让 Agent 能稳定产出同类文章、审稿报告或改写建议。

暂时降级为可选：

- 大规模 SEO 评分。
- 每篇文章强制 8 到 12 个统计数据。
- 社媒分发、邮件、YouTube 脚本等衍生内容。
- 复杂评分脚本、阻塞式 delivery contract、多 agent 调度。

## 文件说明

| 文件 | 内容 | 适合什么时候看 |
| --- | --- | --- |
| `01-skill-system-patterns.md` | Skill 文件组织、触发描述、按需加载参考资料 | 想把博客工作流沉淀成 Skill 或规则时 |
| `02-research-and-briefing.md` | 选题、资料搜集、事实核查、研究 brief | 写需要外部资料或经验总结的文章前 |
| `03-article-structure-and-writing.md` | 文章结构、视觉笔记、标题、段落、图表 | 起草新文章或重写旧文章时 |
| `04-review-and-publishing.md` | 审稿、SEO 轻量检查、发布前 gate | 发文章前或让 Agent 审稿时 |
| `05-prompt-library.md` | 可直接复制使用的 prompt 模板 | 需要快速调用某个写作动作时 |

## 推荐使用顺序

```text
1. 先用研究 brief prompt 收集输入。
2. 再用文章结构 prompt 生成大纲。
3. 用户确认方向后写正文。
4. 用审稿 prompt 做发布前检查。
5. 如需沉淀，再把稳定流程写入 BLOG_AGENT.md 或单独 Skill。
```

## 后续筛选建议

可以先选 3 个最常用技能落到项目规则里：

1. `文章 brief`：防止没想清楚就开写。
2. `视觉笔记结构化写作`：贴合当前博客组件风格。
3. `发布前审稿`：避免 draft、敏感信息、占位词和事实问题。

其他如 SEO、跨平台分发、作者 persona、社区话题研究，可以先作为候选 prompt 保留。
