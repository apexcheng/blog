# MDX 写作指南

这份指南给后续 Agent 使用：写文章时，先把内容写清楚；只有当结构真的需要被看见时，再用 MDX 做可视化表达。

MDX 不是为了让文章看起来更复杂，而是为了让读者更快抓住路径、重点和边界。

## 什么时候应该使用 MDX

适合使用 MDX 的情况：

1. 文章里有明显的结构：流程、判断顺序、模块关系、输入输出、对比项。
2. 有几组读者需要快速扫描的信息，例如指标、场景、风险、结论。
3. 普通段落会变成长列表，但用卡片或步骤能更清楚。
4. 技术概念需要图表、流程图或分栏辅助理解。
5. 文章本身是视觉实验、组件展示或写作样式 Demo。

一个简单判断：如果读者只看标题和视觉块，也能先理解文章骨架，就可以考虑 MDX。

## 什么时候不应该使用 MDX

不建议使用 MDX 的情况：

1. 只是普通叙述、日记、经验记录，段落和列表已经足够清楚。
2. 内容没有稳定结构，只是为了装饰页面。
3. 一个组件只出现一次，且 Markdown 写法更自然。
4. 需要大量自定义样式、交互或脚本，超出当前文章需求。
5. 为了“显得高级”把简单文字拆成太多卡片。

MDX 组件应该减少理解成本，而不是增加维护成本。

## 推荐使用场景

### 开头概览

文章开头可以用 `VisualGrid` 加 `MetricCard` 放 2 到 4 个关键信息：

- 适合读者
- 输入材料
- 输出结果
- 风险或耗时

### 重点结论

核心判断、风险提醒、发布前检查，可以用 `HighlightBox` 或 `Callout`。  
如果只是轻量提示，用 `Callout`；如果是文章级结论，用 `HighlightBox`。

### 流程步骤

线性的处理路径、判断顺序、发布流程，优先用 `DecisionFlow`。  
如果步骤之间有分支、回路或依赖关系，再考虑 `Mermaid`。

### 模块拆解

一个系统、工作流或文章结构可以用 `VisualGrid` 加 `FeatureCard` 拆成 2 到 4 个模块。  
每张卡片只讲一个角色、一个动作或一个边界。

### 对比说明

轻量对比直接用 Markdown 表格。  
如果每个对比项都有较多解释，再用 `FeatureCard` 做分栏。

## 写作习惯

1. 先写结论，再选组件。
2. 组件数量要少，优先服务阅读路径。
3. 每个视觉块前后都要有普通文字承接。
4. 不要把整篇文章都塞进卡片里。
5. 新增 MDX 文章后，同步更新 `docs/writing/CONTENT_INDEX.md`。
6. 新增视觉实验室文章后，同步更新 `docs/writing/VISUAL_LAB.md`。

## import 路径

正式文章在 `src/content/posts/` 下时：

```mdx
import Callout from '../../components/Callout.astro';
import MetricCard from '../../components/MetricCard.astro';
import FeatureCard from '../../components/FeatureCard.astro';
import VisualGrid from '../../components/VisualGrid.astro';
import HighlightBox from '../../components/HighlightBox.astro';
import DecisionFlow from '../../components/DecisionFlow.astro';
import Mermaid from '../../components/Mermaid.astro';
```

视觉实验室文章在 `src/content/posts/visual-lab/` 下时：

```mdx
import Callout from '../../../components/Callout.astro';
import MetricCard from '../../../components/MetricCard.astro';
import FeatureCard from '../../../components/FeatureCard.astro';
import VisualGrid from '../../../components/VisualGrid.astro';
import HighlightBox from '../../../components/HighlightBox.astro';
import DecisionFlow from '../../../components/DecisionFlow.astro';
import Mermaid from '../../../components/Mermaid.astro';
```

## 最小检查

发布前至少确认：

1. frontmatter 字段完整。
2. `category` 只使用 `生活`、`实践`、`教程`、`视觉实验室`。
3. import 路径和当前文章目录层级一致。
4. 组件只承载必要信息，没有替代普通正文。
5. 本地检查或构建通过；未运行时要明确说明。
