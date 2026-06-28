# 个人博客项目

个人技术博客，定位为：

```text
个人技术知识库 + 项目记录 + 图表化技术文章
```

当前 UI 方向已参考 `tmp/design-mockups/clean-tech-journal-full/` 中的新设计模板：**Clean Tech Journal**。

## 技术栈

- Astro
- Starlight
- MDX
- Mermaid
- Django Admin 内容后台

## 核心文档

| 文件 | 作用 |
|---|---|
| `PRD.md` | 项目定位、范围、阶段目标 |
| `Design.md` | UI 方向、页面结构、设计规范 |
| `Content.md` | 内容分类、文章写法、MDX 使用边界 |
| `Development.md` | 开发约定、实现顺序、验证方式 |
| `Deploy.md` | 本地预览和后续部署策略 |

## 本地开发

在 WSL 项目目录运行：

```bash
cd ~/projects/personal-blog
npm install
npm run dev
npm run build
```

Windows 只作为浏览器预览环境使用，例如访问 `localhost`。

## 发文流程

Django 数据库是文章内容源，`src/content/posts/*.md` / `*.mdx` 是导出产物。Agent 或人工准备好文章文件后，先入库，再导出并构建：

```bash
python3 backend/manage.py upsert_post path/to/article.mdx
python3 backend/manage.py export_posts
npm run build
```

需要同时清理数据库已不存在的旧导出文章文件时：

```bash
python3 backend/manage.py export_posts --clean
```

`--clean` 只清理导出目录下的 `.md` / `.mdx` 文件，不处理其它资源文件。

## 当前原则

- 先把 UI 和内容结构做顺，再考虑部署。
- 前台优先静态构建，Django 只作为内容后台使用。
- 普通文章用 Markdown，需要组件时再用 MDX。
- 图表第一版优先使用 Mermaid。
- 设计落地以简单、可维护、少依赖为准。
