import feedparser
import os
from datetime import datetime
import argparse
from urllib.parse import urlparse
import requests

# List of common RSS feed paths
COMMON_RSS_PATHS = [
    "/rss.xml",
    "/feed",
    "/feeds/posts/default",
    "/rss",
    "/atom.xml",
    "/feeds",
    "/index.rss"
]

def parse_arguments() -> argparse.Namespace:
    """
    Parse command-line arguments for the Startr RSS Grabber.

    Returns:
        argparse.Namespace: Parsed command-line arguments.
    """
    parser = argparse.ArgumentParser(
        description='Startr RSS Grabber. If no RSS URL is provided, the script will attempt to find a common RSS feed path for the given domain.'
    )
    
    args_config = {
        'debug': ('store_true', False, "Enable debug mode"),
        'rss_url': (str, None, "RSS feed URL. If not provided, the domain will be checked for common feed paths."),
        'output_dir': (str, None, "Output directory for saving articles"),
    }

    for arg, (action_or_type, default, help_text) in args_config.items():
        flag = f'--{arg}'
        short_flag = f'-{arg[0]}'
        
        if action_or_type == 'store_true':
            parser.add_argument(
                short_flag,
                flag,
                action=action_or_type,
                default=default,
                help=help_text
            )
        else:
            parser.add_argument(
                short_flag,
                flag,
                type=action_or_type,
                default=default,
                help=help_text
            )

    return parser, parser.parse_args()

# Function to create directories
def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Function to sanitize and format the base folder name
def sanitize_base_folder_name(base_name):
    sanitized_name = ''.join([c if c.isalnum() else '-' for c in base_name])
    return sanitized_name.upper()

# Function to sanitize and format article titles
def sanitize_title(title):
    sanitized_title = ''.join([c if c.isalnum() or c.isspace() else ' ' for c in title])
    formatted_title = '-'.join([word.capitalize() for word in sanitized_title.split()])
    return formatted_title

# Function to derive a default output directory from the RSS URL
def get_default_output_dir(rss_url):
    parsed_url = urlparse(rss_url)
    base_name = parsed_url.netloc or parsed_url.path
    sanitized_name = sanitize_base_folder_name(base_name)
    return sanitized_name or "OUTPUT"

# Function to search for a common RSS feed path
def find_rss_feed(domain):
    for path in COMMON_RSS_PATHS:
        url = f"{domain.rstrip('/')}{path}"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200 and 'xml' in response.headers.get('Content-Type', ''):
                print(f"Found RSS feed: {url}")
                return url
        except requests.RequestException as e:
            print(f"Failed to connect to {url}: {e}")
    print("No RSS feed found.")
    return None

# Function to write markdown file with 11ty front matter
def write_markdown_with_front_matter(article, path):
    front_matter = f"""---
title: {article['title']}
og_title: {article['title']}
og_description: {article.get('summary', 'No Description')}
og_image: {article.get('media_content', [{'url': 'No Image'}])[0]['url']}
og_image_width: 1000
og_image_height: 667
links:
   hreflangs:
      en: {article.get('link', '')}
layout: layouts/base.html
---

"""
    content = f"{front_matter}{article['summary']}\n"
    if 'link' in article:
        content += f"\n[Read more]({article['link']})\n"

    with open(path, 'w') as f:
        f.write(content)
    
    return len(content)

# Parse RSS feed
def parse_rss_feed(rss_url, output_dir):
    feed = feedparser.parse(rss_url)
    total_articles = 0
    total_chars = 0

    for entry in feed.entries:
        pub_date = datetime(*entry.published_parsed[:6])
        year = str(pub_date.year)
        month = str(pub_date.month).zfill(2)
        day = str(pub_date.day).zfill(2)
        
        base_dir = os.path.join(output_dir, year, month, day)
        create_directory(base_dir)
        file_title = sanitize_title(entry.title)
        file_path = os.path.join(base_dir, f"{file_title}.md")
        chars_written = write_markdown_with_front_matter(entry, file_path)
        
        total_articles += 1
        total_chars += chars_written

        print(f"Saved: {file_path}")

    print("\nProcessing Report")
    print("-------------------")
    print(f"Total Articles Processed: {total_articles}")
    print(f"Total Characters Written: {total_chars}")

if __name__ == '__main__':
    parser, args = parse_arguments()

    if args.rss_url:
        rss_url = args.rss_url
    elif args.output_dir:  # Check if output_dir is a bare domain
        parsed_url = urlparse(args.output_dir)
        if parsed_url.scheme and parsed_url.netloc:
            domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
            rss_url = find_rss_feed(domain)
            if not rss_url:
                print("No RSS feed could be found for the domain.")
                exit(1)
        else:
            print("Invalid domain provided or no RSS URL. Please specify a valid domain or RSS URL.")
            parser.print_help()
            exit(1)
    else:
        parser.print_help()
        exit(1)

    output_dir = args.output_dir or get_default_output_dir(rss_url)
    parse_rss_feed(rss_url, output_dir)
