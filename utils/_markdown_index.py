import os

def create_index_md(directory):
    """
    Creates an index.md file in the specified directory containing links to
    all child directories and .md files, excluding those with their own index.md.
    """
    index_md_path = os.path.join(directory, 'index.md')
    if os.path.exists(index_md_path):
        print(f"index.md already exists in {directory}")
        return

    entries = os.listdir(directory)
    lines = ['# Index of the directory\n\n']

    for entry in entries:
        full_path = os.path.join(directory, entry)
        if os.path.isdir(full_path) and 'index.md' not in os.listdir(full_path):
            lines.append(f"- [{entry}]({entry}/)\n")
        elif entry.endswith('.md') and entry != 'index.md':
            link_name = entry[:-3]  # Remove the '.md' part for the display name
            lines.append(f"- [{link_name}]({entry})\n")

    with open(index_md_path, 'w') as f:
        f.writelines(lines)
    print(f"Created index.md in {directory}")

def recursive_index_md_creation(start_path):
    """
    Recursively walks through the directory tree starting from start_path
    and creates index.md files as needed.
    """
    for root, dirs, files in os.walk(start_path):
        create_index_md(root)

# Usage example:
# recursive_index_md_creation('/path/to/start/directory')
