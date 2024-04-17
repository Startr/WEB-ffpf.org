#!/usr/bin/env python3
import os
import sys

def create_index_md(directory):
    """
    Creates an index.md file in the specified directory containing links to
    all child directories and markdown files, if they do not already have an index.md file.
    The links to markdown files will omit the '.md' suffix.
    """
    index_md_path = os.path.join(directory, 'index.md')
    # Check if index.md already exists; if it does, do nothing
    if os.path.exists(index_md_path):
        print(f"index.md already exists in {directory}")
        return
    
    entries = os.listdir(directory)
    markdown_links = []

    # Generate links for markdown files and directories
    for entry in sorted(entries):
        full_path = os.path.join(directory, entry)
        if os.path.isdir(full_path):
            # Check if the directory has an index.md
            if 'index.md' not in os.listdir(full_path):
                markdown_links.append(f"- [{entry}]({entry}/)\n")
        elif entry.endswith('.md') and entry != 'index.md':
            link_name = entry[:-3]  # Remove the '.md' part
            markdown_links.append(f"- [{link_name}]({entry})\n")
    
    # Only create index.md if there are links to include
    if markdown_links:
        with open(index_md_path, 'w') as f:
            f.write("# Index of the directory\n\n")
            f.writelines(markdown_links)
        print(f"Created index.md in {directory}")

def recursive_index_md_creation(start_path):
    """
    Recursively walks through the directory tree from start_path,
    creating index.md files where needed.
    """
    for root, dirs, files in os.walk(start_path, topdown=False):
        create_index_md(root)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python create_index.py <directory>")
        sys.exit(1)
    recursive_index_md_creation(sys.argv[1])
