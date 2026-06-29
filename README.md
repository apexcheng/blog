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

## 本地开发

在 WSL 项目目录运行：

```bash
cd ~/projects/personal-blog
npm install
npm run dev
npm run build
```

Windows 只作为浏览器预览环境使用，例如访问 `localhost`。

## 部署

当前通过 GitHub Actions 自动部署到 GitHub Pages：

```text
https://apexcheng.github.io/
```

发布前在本地确认：

```bash
npm test
npm run build
```

然后推送到 `main`：

```bash
git push origin main
```

GitHub 仓库 Settings → Pages 中 Source 需要选择 GitHub Actions。当前仓库名是 `apexcheng.github.io`，属于 GitHub 用户站点，部署在根路径 `/`，不需要配置 `base`。

上线前检查：

- 确认 `npm test` 和 `npm run build` 通过。
- 确认 `astro.config.mjs` 中 `site: 'https://apexcheng.github.io'` 与当前 GitHub Pages 地址一致，且不要保留旧的 `base: '/blog'`。
- 确认 RSS 和 sitemap 地址使用当前站点配置。
- 确认 `public/files/` 中没有敏感文件；该目录内容会被静态发布。

## 发文流程

`src/content/posts/*.md` / `*.mdx` 是文章内容源。Agent 或人工直接在这个目录新增或修改文章文件，然后构建验证：

```bash
npm run build
```

普通文章用 Markdown，需要组件时再用 MDX。新文章默认 `draft: true`，发布时改成 `false`。`private: true` 文章不会进入公开页面、RSS 或搜索索引。

可下载文件放在 `public/files/`，文章中用 `/files/` 开头链接。`private: true` 文章不等于私密文件权限，公开静态目录不要放账号、token 或内部资料。

## 当前原则

- 先把 UI 和内容结构做顺，再考虑部署。
- 前台保持纯静态构建，不维护 Django 后端内容源。
- 普通文章用 Markdown，需要组件时再用 MDX。
- 图表第一版优先使用 Mermaid。
- 设计落地以简单、可维护、少依赖为准。
