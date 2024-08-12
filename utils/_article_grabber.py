import feedparser
import os
from datetime import datetime
import argparse
from urllib.parse import urlparse

def parse_arguments() -> argparse.Namespace:
    """
    Parse command-line arguments for the Startr RSS Grabber.

    Returns:
        argparse.Namespace: Parsed command-line arguments.
    """
    parser = argparse.ArgumentParser(description='Startr RSS Grabber')
    
    # Dictionary to hold argument configurations
    args_config = {
        'debug': ('store_true', False, "Enable debug mode"),
        'rss_url': (str, None, "RSS feed URL"),
        'output_dir': (str, None, "Output directory for saving articles"),
    }

    # Loop through each argument configuration
    for arg, (action_or_type, default, help_text) in args_config.items():
        flag = f'--{arg}'  # Infer long flag based on key name
        short_flag = f'-{arg[0]}'  # Infer short flag based on the first character of the key name
        
        if action_or_type == 'store_true':
            parser.add_argument(
                short_flag,
                flag,
                action=action_or_type,
                default=default,
                help=help_text
            )
        else:
            # Add the argument to the parser with the given configuration
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

# Function to sanitize file names
def sanitize_title(title):
    return ''.join([c if c.isalnum() else '-' for c in title])

# Function to derive a default output directory from the RSS URL
def get_default_output_dir(rss_url):
    parsed_url = urlparse(rss_url)
    base_name = parsed_url.netloc or parsed_url.path
    sanitized_name = sanitize_title(base_name)
    return sanitized_name or "output"

# Function to write markdown file
def write_markdown(article, path):
    with open(path, 'w') as f:
        f.write(f"# {article['title']}\n\n")
        f.write(f"**Published on:** {article['published']}\n\n")
        f.write(f"{article['summary']}\n")
        if 'link' in article:
            f.write(f"\n[Read more]({article['link']})\n")

# Parse RSS feed
def parse_rss_feed(rss_url, output_dir):
    feed = feedparser.parse(rss_url)
    for entry in feed.entries:
        # Extract the publication date
        pub_date = datetime(*entry.published_parsed[:6])
        year = str(pub_date.year)
        month = str(pub_date.month).zfill(2)
        day = str(pub_date.day).zfill(2)
        
        # Create directories
        base_dir = os.path.join(output_dir, year, month, day)
        create_directory(base_dir)
        # Create markdown file path
        file_title = sanitize_title(entry.title)
        file_path = os.path.join(base_dir, f"{file_title}.md")
        # Write markdown file
        write_markdown(entry, file_path)
        print(f"Saved: {file_path}")

if __name__ == '__main__':
    parser, args = parse_arguments()
    if not args.rss_url:
        # show argument parser help message
        parser.print_help()
    else:
        # Determine the output directory
        output_dir = args.output_dir or get_default_output_dir(args.rss_url)
        parse_rss_feed(args.rss_url, output_dir)
