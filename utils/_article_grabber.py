import feedparser
import os
from datetime import datetime

# Function to create directories
def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Function to sanitize file names
def sanitize_title(title):
    return ''.join([c if c.isalnum() else '-' for c in title])

# Function to write markdown file
def write_markdown(article, path):
    with open(path, 'w') as f:
        f.write(f"# {article['title']}\n\n")
        f.write(f"**Published on:** {article['published']}\n\n")
        f.write(f"{article['summary']}\n")
        if 'link' in article:
            f.write(f"\n[Read more]({article['link']})\n")

# Parse RSS feed
def parse_rss_feed(rss_url):
    feed = feedparser.parse(rss_url)
    for entry in feed.entries:
        # Extract the publication date
        pub_date = datetime(*entry.published_parsed[:6])
        year = str(pub_date.year)
        month = str(pub_date.month).zfill(2)
        day = str(pub_date.day).zfill(2)
        
        # Create directories
        base_dir = os.path.join(year, month, day)
        create_directory(base_dir)
        # Create markdown file path
        file_title = sanitize_title(entry.title)
        file_path = os.path.join(base_dir, f"{file_title}.md")
        # Write markdown file
        write_markdown(entry, file_path)
        print(f"Saved: {file_path}")

# Example RSS feed URL
rss_url = 'https://example.com/rss-feed-url'
parse_rss_feed(rss_url)

