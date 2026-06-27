# 个人博客项目

这是个人博客网站的本地项目目录。

当前阶段已完成需求与选型确认，下一步可以在当前 WSL 项目目录初始化具体框架。

## 当前文件

- `PRD-个人博客网站.md`：个人博客网站 PRD 与技术选型记录

## 本地开发

请在 WSL 项目目录 `/home/cheng/projects/personal-blog` 中运行：

```bash
npm install
npm run dev
npm run build
```

## 当前原则

- 先本地开发，后续再考虑是否上云。
- 优先 WSL 开发环境。
- Codex / Claude Code 开发时必须使用 WSL 环境执行命令、安装依赖、启动服务和运行验证。
- Windows 仅用于浏览器访问 `localhost` 预览，不在 Windows 目录或 Windows PowerShell 中运行项目命令。
- 优先静态博客 / 文档站形态。
- 已确定使用 Astro + Starlight + MDX + Mermaid。
- 现在、未来都不做评论功能。
- 前期不做后台、登录。
- PRD 中的 Skill 推荐为候选考虑，不代表最终采纳。
