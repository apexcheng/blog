from pathlib import Path

from django.core.management.base import BaseCommand

from posts.models import Post


class Command(BaseCommand):
    help = "Export Django posts into src/content/posts as Markdown files."

    def add_arguments(self, parser):
        parser.add_argument(
            "--posts-dir",
            default=None,
            help="Markdown posts directory. Defaults to src/content/posts.",
        )
        parser.add_argument(
            "--include-drafts",
            action="store_true",
            help="Export draft posts too.",
        )

    def handle(self, *args, **options):
        base_dir = Path(__file__).resolve().parents[4]
        posts_dir = Path(options["posts_dir"]) if options["posts_dir"] else base_dir / "src" / "content" / "posts"
        posts_dir.mkdir(parents=True, exist_ok=True)

        posts = Post.objects.select_related("category").prefetch_related("tags")
        if not options["include_drafts"]:
            posts = posts.filter(draft=False)

        exported_count = 0
        for post in posts:
            file_path = get_export_path(posts_dir, post.slug)
            file_path.write_text(render_post(post), encoding="utf-8")
            exported_count += 1

        self.stdout.write(self.style.SUCCESS(f"Exported {exported_count} posts."))


def get_export_path(posts_dir, slug):
    mdx_path = posts_dir / f"{slug}.mdx"
    if mdx_path.exists():
        return mdx_path

    md_path = posts_dir / f"{slug}.md"
    if md_path.exists():
        return md_path

    return md_path


def render_post(post):
    tag_names = [tag.name for tag in post.tags.all()]
    tags = "tags: []" if not tag_names else "tags:\n" + "\n".join(f"  - {name}" for name in tag_names)
    body = post.body.rstrip("\n")
    return f"""---
title: {post.title}
description: {post.description}
date: {post.date.isoformat()}
category: {post.category.name}
{tags}
minutes: {post.minutes}
featured: {format_bool(post.featured)}
draft: {format_bool(post.draft)}
private: {format_bool(post.private)}
---

{body}
"""


def format_bool(value):
    return "true" if value else "false"
