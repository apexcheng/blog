# Agent 文档入口

本目录保存 Agent 的详细协作规则和写作参考材料。根目录文件负责路由，本目录负责承载细则。

## 入口关系

```text
llms.txt
├── BLOG_AGENT.md -> docs/agent/blog-rules.md
└── AGENTS.md -> docs/agent/code-rules.md
```

## 文件说明

| 文件 | 职责 | 默认读取时机 |
| --- | --- | --- |
| `../../llms.txt` | 唯一任务路由入口 | 每次 Agent 任务开始 |
| `../../AGENTS.md` | 代码 / 工程任务短入口 | 修改代码、构建、测试、依赖、工程结构 |
| `code-rules.md` | 代码 / 工程任务详细规则 | 代码 / 工程任务需要细则时 |
| `../../BLOG_AGENT.md` | 文章任务短入口 | 写作、审查、发布文章 |
| `blog-rules.md` | 文章任务详细规则 | 文章任务需要细则时 |
| `blog-skills/` | 写作技能参考库和 prompt 候选库 | 需要 brief、研究、审稿、Skill 化判断时按需读取 |

## 使用原则

- 普通任务只读路由和对应入口，不默认通读本目录。
- `blog-skills/` 是参考库，不是硬规则全集。
- `.claude/` 和 `.codex/agents/` 是工具适配层，保留在各自目录中。
- 如果入口文件和详细规则冲突，以更具体、更严格的规则为准。
