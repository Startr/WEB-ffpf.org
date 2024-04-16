#!/usr/bin/env python3
import os
import argparse
import html2text
import re
from bs4 import BeautifulSoup

def convert_html_to_markdown(html_content):
    """Convert HTML content to Markdown, preserving 11ty front matter."""
    text_maker = html2text.HTML2Text()
    text_maker.ignore_links = False
    text_maker.ignore_images = True
    markdown_content = text_maker.handle(html_content)
    return markdown_content

def extract_and_include_meta(html_content):
    """Extract title and social share meta information and format as YAML for 11ty front matter."""
    soup = BeautifulSoup(html_content, 'html.parser')
    title = soup.find('title').text if soup.find('title') else 'No Title'
    og_title = soup.find('meta', property='og:title')['content'] if soup.find('meta', property='og:title') else title
    og_description = soup.find('meta', property='og:description')['content'] if soup.find('meta', property='og:description') else 'No Description'
    og_image = soup.find('meta', property='og:image')['content'] if soup.find('meta', property='og:image') else 'No Image'
    return f"---\ntitle: {title}\nog_title: {og_title}\nog_description: {og_description}\nog_image: {og_image}\nlayout: layouts/base.html\n---"

def extract_and_preserve_front_matter(html_content):
    """Extract 11ty front matter and return it along with the rest of the content, including new meta data."""
    front_matter_pattern = r"^(---[\s\S]*?---)"
    match = re.search(front_matter_pattern, html_content)
    if match:
        front_matter = match.group(1)
        content_without_front_matter = re.sub(front_matter_pattern, '', html_content, count=1)
        return front_matter, content_without_front_matter
    else:
        # Extract meta information and create default front matter with it
        default_front_matter = extract_and_include_meta(html_content)
        return default_front_matter, html_content

def process_directory(directory):
    """Process each HTML file in the directory and its subdirectories, preserving or adding 11ty front matter with meta data."""
    for subdir, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(subdir, file)
            if filepath.endswith(".html"):
                new_path = filepath + "~"
                if os.path.exists(new_path):
                    continue  # Skip if renamed file exists to avoid reprocessing
                with open(filepath, 'r', encoding='utf-8') as f:
                    html_content = f.read()
                
                front_matter, html_content_without_front_matter = extract_and_preserve_front_matter(html_content)
                markdown_content = convert_html_to_markdown(html_content_without_front_matter)
                full_content = front_matter + "\n" + markdown_content if front_matter else markdown_content
                markdown_file_path = filepath.rsplit('.', 1)[0] + '.md'
                
                with open(markdown_file_path, 'w', encoding='utf-8') as f:
                    f.write(full_content)
                
                os.rename(filepath, new_path)
                print(f"Converted {filepath} to {markdown_file_path} and renamed original to {new_path}")

def offer_cleanup(directory):
    """Offer to delete all files ending with ~ in the directory."""
    print("Detected files ending with '~'. Do you want to delete them? [y/N]:")
    response = input().strip().lower()
    if response == 'y':
        for subdir, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith("~"):
                    os.remove(os.path.join(subdir, file))
                    print(f"Deleted {os.path.join(subdir, file)}")

def main():
    parser = argparse.ArgumentParser(description="Convert all HTML files in a directory to Markdown and manage processed files")
    parser.add_argument('directory', type=str, nargs='?', help='Directory to process')
    
    args = parser.parse_args()
    
    if not args.directory:
        print("Please specify a directory. Usage: ./script.py <directory>")
        return
    
    # Check for cleanup first
    cleanup_files_exist = any(f.endswith("~") for r, d, fs in os.walk(args.directory) for f in fs)
    if cleanup_files_exist:
        offer_cleanup(args.directory)

    process_directory(args.directory)

if __name__ == "__main__":
    main()
