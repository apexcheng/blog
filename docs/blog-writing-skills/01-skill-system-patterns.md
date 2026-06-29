# Skill 系统模式

这一类主要来自 `anthropics/skills` 和 `awesome-agent-skills`。对本博客最有价值的不是某个具体技能，而是“如何把重复工作写成 Agent 能稳定执行的轻量流程”。

## 1. Skill 不是大 prompt

一个好 Skill 更像任务说明书：

- `name`：短、唯一、用连字符。
- `description`：写清楚做什么、什么时候触发，这是最重要的路由信息。
- `SKILL.md` 正文：只放主流程、约束、输出格式和少量示例。
- `references/`：放长规则、评分表、示例、模板，按需读取。
- `scripts/`：只给稳定、可验证、重复性高的动作使用。

对本博客的改造：

```text
blog-brief/
  SKILL.md              # 选题、目标、素材、结构
  references/
    visual-note.md      # 本博客视觉笔记组件规则
    review-checklist.md # 发布前检查
```

## 2. 触发描述要具体

技能是否会被用到，主要靠 description。不要只写“写博客”，要写触发场景。

候选描述：

```yaml
name: blog-brief
description: 为个人技术博客生成写作 brief。用户提到写文章、整理经验、改写旧文、做视觉笔记、沉淀 Agent 工作流、RPA 经验或数据处理案例时使用。输出包含目标读者、核心结论、素材清单、文章结构、需要确认的问题和验证方式。
```

## 3. 按需加载，而不是一次读完

`anthropics/skills` 的核心模式是 progressive disclosure：

1. 只让模型常驻技能名称和描述。
2. 命中任务时读取 `SKILL.md`。
3. 只有需要某类细节时，再读 reference。

对本博客可这样拆：

| 任务 | 先读 | 再按需读 |
| --- | --- | --- |
| 新文章 | `llms.txt`、`BLOG_AGENT.md` | `CONTENT_INDEX.md`、1 到 3 篇旧文、`templates/post.mdx` |
| 审稿 | `BLOG_AGENT.md` | 目标文章、相关旧文 |
| 技能沉淀 | `AGENTS.md`、本文件 | 相关 prompt 文件 |

## 4. 技能正文保持短而可执行

适合本博客的 Skill 正文结构：

```markdown
# Blog Brief

## 输入
- 主题
- 目标读者
- 想表达的结论
- 可引用素材

## 流程
1. 判断文章类型。
2. 列出还缺什么。
3. 生成结构大纲。
4. 标记需要用户确认或运行验证的事实。

## 输出格式
固定输出 brief，包含标题候选、核心结论、结构、素材、风险、下一步。
```

## 5. 先沉淀 prompt，再决定是否做 Skill

`claude-blog` 是 30 个子技能的重型体系，本博客暂时没必要一步到位。更稳的路线：

1. 先把常用 prompt 放进 `docs/blog-writing-skills/05-prompt-library.md`。
2. 连续使用几次，观察哪些真的重复。
3. 再把稳定、边界清楚的流程升级成 Skill。

## 6. 从 awesome 列表得到的分类启发

`awesome-agent-skills` 更像技能目录。可借鉴它的分类方式，把写作能力拆成小块：

- 写作：brief、outline、write、rewrite。
- 质量：fact-check、review、seo-check、sensitive-info-check。
- 研究：authority research、discourse research、competitor scan。
- 资产：image、chart、diagram、downloadable file。
- 分发：repurpose、newsletter、social post。
- 维护：taxonomy、content index、stale content audit。

对本博客优先级最高的是“写作、质量、研究、维护”，分发可以以后再说。
