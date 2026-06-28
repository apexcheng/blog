from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from posts.management.commands.import_posts import parse_post_file, get_or_create_category, get_or_create_tag
from posts.models import Post


class Command(BaseCommand):
    help = "Insert or update one Markdown / MDX post file into Django."

    def add_arguments(self, parser):
        parser.add_argument("file_path", help="Path to a .md or .mdx article file.")

    def handle(self, *args, **options):
        file_path = Path(options["file_path"])
        if file_path.suffix not in [".md", ".mdx"]:
            raise CommandError(f"Unsupported post file type: {file_path}")
        if not file_path.exists():
            raise CommandError(f"Post file does not exist: {file_path}")

        text = file_path.read_text(encoding="utf-8")
        frontmatter, body = parse_post_file(text, file_path)
        category = get_or_create_category(frontmatter["category"])
        tags = [get_or_create_tag(name) for name in frontmatter.get("tags", [])]
        defaults = {
            "title": frontmatter["title"],
            "description": frontmatter["description"],
            "date": frontmatter["date"],
            "category": category,
            "minutes": frontmatter["minutes"],
            "featured": frontmatter.get("featured", False),
            "draft": frontmatter.get("draft", False),
            "private": frontmatter.get("private", False),
            "source_format": file_path.suffix.lstrip("."),
            "body": body,
        }

        post, created = Post.objects.update_or_create(
            slug=file_path.stem,
            defaults=defaults,
        )
        post.tags.set(tags)
        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{action} post: {post.slug}"))
