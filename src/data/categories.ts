export const categories = ['生活', '实践', '教程', '视觉实验室'] as const;

export type CategoryName = (typeof categories)[number];

export const categoryMetaList = [
  {
    name: '生活',
    description: '记录生活里的实际问题、个人经验和判断过程。\n包括健康、消费、装修、工作感受、日常观察等内容。',
    order: 1,
  },
  {
    name: '实践',
    description:
      '记录我实际做过的项目、工具改造和技术踩坑。\n重点不是系统教学，而是从真实问题出发，说明怎么做、为什么这样做。',
    order: 2,
  },
  {
    name: '教程',
    description:
      '面向系统学习的文章和系列内容。\n适合从一个主题开始逐步阅读，比如认识 Agent、AI 工作流、底层框架和实战案例。',
    order: 3,
  },
  {
    name: '视觉实验室',
    description:
      '用于测试博客的文章样式、组件、代码块、图表和视觉表达。\n这里主要服务于写作效果预览和 Agent 参考，不作为正式内容分类。',
    order: 4,
  },
] as const satisfies readonly {
  name: CategoryName;
  description: string;
  order: number;
}[];

export function getCategoryMeta(categoryName: CategoryName) {
  return categoryMetaList.find((category) => category.name === categoryName);
}
