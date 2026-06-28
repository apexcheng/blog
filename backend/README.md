# Django 后端第一阶段

这是个人博客的第一阶段 Django 后端，只提供 Django Admin 和简单 JSON API。

当前 Astro 前台还没有接入这些 API，前台仍然使用现有 Markdown / MDX 内容静态构建。

## 安装依赖

在 WSL 项目目录中运行：

```bash
cd /home/cheng/projects/personal-blog
python3 -m pip install --user -r backend/requirements.txt
```

如需使用虚拟环境，可以自行在仓库外创建，避免提交虚拟环境目录。

## 迁移数据库

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py migrate
```

默认数据库是 `backend/db.sqlite3`，仅用于本地开发，不应提交到仓库。

## 创建管理员

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py createsuperuser
```

创建后可在 Django Admin 管理文章、分类和标签。

## 启动 Django

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py runserver
```

常用地址：

- Admin: `http://127.0.0.1:8000/admin/`
- 文章列表 API: `http://127.0.0.1:8000/api/posts/`
- 分类 API: `http://127.0.0.1:8000/api/categories/`
- 标签 API: `http://127.0.0.1:8000/api/tags/`

## 当前 API

- `GET /api/posts/`：返回非 draft 文章列表，不返回正文。
- `GET /api/posts/<slug>/`：返回单篇非 draft 文章；private 文章未验证密码时返回 403，且不返回正文。
- `POST /api/posts/<slug>/verify-password/`：验证单篇文章密码，密码正确时返回正文。
- `GET /api/categories/`：返回分类列表。
- `GET /api/tags/`：返回标签列表。

## 导入现有文章

把当前 `src/content/posts/` 下的 Markdown / MDX 文章导入 Django 数据库：

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py import_posts
```

导入规则：

- slug 使用文件名，不处理嵌套路由。
- category 和 tags 不存在时自动创建。
- 重复导入同一 slug 时更新已有文章，不重复创建。
- body 保留 Markdown / MDX 原文，不做渲染。

测试或临时导入其他目录时可以指定：

```bash
python3 backend/manage.py import_posts --posts-dir /path/to/posts
```

## 导出文章

把 Django 数据库中的文章导出回 `src/content/posts/`：

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py export_posts
```

默认只导出非 draft 文章。需要连同草稿一起导出时运行：

```bash
python3 backend/manage.py export_posts --include-drafts
```

测试或临时导出到其他目录时可以指定：

```bash
python3 backend/manage.py export_posts --posts-dir /path/to/posts
```

导出规则：

- 如果已存在同 slug 的 `.mdx` 文件，优先覆盖 `.mdx`。
- 否则如果已存在同 slug 的 `.md` 文件，覆盖 `.md`。
- 如果同 slug 文件不存在，新建 `{slug}.md`。
- frontmatter 对齐当前 Astro posts schema。
- 不导出 password 字段。
- body 保留数据库中的 Markdown / MDX 原文，不做渲染。

## 第一阶段发布流程

当前阶段仍然保留 Astro 静态前台，不让 Astro 页面直接请求 Django API。建议流程是：

```bash
python3 backend/manage.py import_posts
python3 backend/manage.py runserver
# 在 Django Admin 中编辑文章
python3 backend/manage.py export_posts
npm run build
```

也就是说：Django Admin 负责编辑，`export_posts` 负责写回 Markdown，Astro 继续按静态内容构建。

## 测试

```bash
cd /home/cheng/projects/personal-blog
python3 backend/manage.py test posts
```

测试覆盖公开文章列表过滤 draft、private 文章未验证密码不返回正文、正确密码可获取正文。
