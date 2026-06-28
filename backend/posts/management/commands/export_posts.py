from pathlib import Path
import json

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
            "--public-only",
            action="store_true",
            help="Export only posts that can enter public static pages.",
        )
        parser.add_argument(
            "--clean",
            action="store_true",
            help="Remove stale .md / .mdx exports that no longer exist in the database result.",
        )

    def handle(self, *args, **options):
        base_dir = Path(__file__).resolve().parents[4]
        posts_dir = Path(options["posts_dir"]) if options["posts_dir"] else base_dir / "src" / "content" / "posts"
        posts_dir.mkdir(parents=True, exist_ok=True)

        posts = Post.objects.select_related("category").prefetch_related("tags")
        if options["public_only"]:
            posts = posts.filter(draft=False, private=False)

        exported_count = 0
        export_paths = set()
        for post in posts:
            file_path = get_export_path(posts_dir, post.slug, post.source_format)
            file_path.write_text(render_post(post), encoding="utf-8")
            export_paths.add(file_path)
            exported_count += 1

        cleaned_count = 0
        if options["clean"]:
            for file_path in posts_dir.iterdir():
                if file_path.suffix not in [".md", ".mdx"]:
                    continue
                if file_path not in export_paths:
                    file_path.unlink()
                    cleaned_count += 1

        self.stdout.write(self.style.SUCCESS(f"Exported {exported_count} posts."))
        if options["clean"]:
            self.stdout.write(self.style.SUCCESS(f"Cleaned {cleaned_count} stale posts."))


def get_export_path(posts_dir, slug, source_format):
    return posts_dir / f"{slug}.{source_format}"


def render_post(post):
    tag_names = [tag.name for tag in post.tags.all()]
    tags = "tags: []" if not tag_names else "tags:\n" + "\n".join(f"  - {format_string(name)}" for name in tag_names)
    body = post.body.rstrip("\n")
    return f"""---
title: {format_string(post.title)}
description: {format_string(post.description)}
date: {post.date.isoformat()}
category: {format_string(post.category.name)}
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


def format_string(value):
    return json.dumps(value, ensure_ascii=False)
