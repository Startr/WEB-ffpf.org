#!/usr/bin/env python3

import re
import os
import argparse
from PIL import Image
from bs4 import BeautifulSoup

preserve_ids = [
    'history', 'vision', 'values', 'partnership', 'board', 'up', 'past',
    'apply', 'collecte', 'histoire', 'vision', 'valeurs', 'conseil', 'venir',
    'passées', 'benevole', 'inscrire', 'collecte'
]

def format_prettify(soup):
    pretty_html = soup.prettify()
    return pretty_html.replace('  ', '    ')

def convert_to_webp(image_path, output_path):
    with Image.open(image_path) as img:
        img.save(output_path, 'WEBP', quality=80, method=6)

def archive_gif(image_path, archive_dir):
    os.makedirs(archive_dir, exist_ok=True)
    os.rename(image_path, os.path.join(archive_dir, os.path.basename(image_path)))

def update_image_urls(soup):
    for img in soup.find_all('img', src=True):
        img_src = img['src']
        src_parts = img_src.split('?')  # Split by query parameters if any
        base_src = src_parts[0]  # Before any query parameters
        base_src = os.path.splitext(base_src)[0] + '.webp'  # Change to .webp
        if len(src_parts) > 1:
            img['src'] = base_src + '?' + src_parts[1]  # Reattach query parameters if there were any
        else:
            img['src'] = base_src

def remove_srcset_attributes(soup):
    for img in soup.find_all('img'):
        # If 'srcset' attribute exists, delete it
        if 'srcset' in img.attrs:
            del img.attrs['srcset']

def remove_unwanted_elements_and_add_css(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        soup = BeautifulSoup(file, 'html.parser')

    for element in soup.find_all(['script', 'style'] + soup.find_all(attrs={"type": "text/css"})):
        element.decompose()

    for link in soup.find_all('link', href=True):
        if link['href'].startswith('wp-json'):
            link.decompose()

    for tag in soup.find_all(True):
        if tag.get('id') not in preserve_ids:
            del tag['id']
        tag.attrs = {key: value for key, value in tag.attrs.items() if key not in ['class']}

    css_url = 'https://startr.style/style.css'
    if not soup.find('link', {'href': css_url}):
        css_link = soup.new_tag('link', rel='stylesheet', href=css_url)
        if soup.head:
            soup.head.append(css_link)

    update_image_urls(soup) #updates the image URLs in the HTML
    remove_srcset_attributes(soup) #removes the srcset attributes from the images

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(format_prettify(soup))

def process_html_for_njk(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    header_end_index = content.find('</header>')
    footer_start_index = content.find('<footer')

    # Strip content until the header end and from the footer start
    if header_end_index != -1 and footer_start_index != -1:
        content = content[header_end_index + len('</header>'):footer_start_index]

    # Insert the new header
    new_header = "---\nlayout: layouts/base.njk\neleventyNavigation:\n  key: Home\n  order: 1\nnumberOfLatestPostsToShow: 3\n---\n"
    content = new_header + content

    # Write back the modified content with a .njk extension
    new_file_path = os.path.splitext(file_path)[0] + '.njk'
    with open(new_file_path, 'w', encoding='utf-8') as file:
        file.write(content)

    # Optionally, remove the original .html file
    os.remove(file_path)

def process_html_and_save(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()  # Reads the entire content of the file

    # Identifies the positions of the </header> closing tag and the <footer> opening tag
    header_end_index = content.find('</header>')
    footer_start_index = content.find('<footer')

    # If both tags are found, the content outside these tags is stripped
    if header_end_index != -1 and footer_start_index != -1:
        content = content[header_end_index + len('</header>'):footer_start_index]

    # Prepends a predefined header to the stripped content
    new_header = "---\nlayout: layouts/base.njk\neleventyNavigation:\n  key: Home\n  order: 1\nnumberOfLatestPostsToShow: 3\n---\n"
    content = new_header + content

    # Updated regex pattern to exclude specific media tags (img, audio, video)
    empty_tags_pattern = re.compile(r'<(?!img|audio|video)(\w+)(\s+[^>]*)?>\s*</\1>|<(?!img|audio|video|iframe)(\w+)(\s+[^>]*)?/>')
    content = re.sub(empty_tags_pattern, '', content)  # Remove empty tags except for media tags

    # Overwrites the original file with the modified content
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_images(directory, archive_dir):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            output_path = os.path.splitext(file_path)[0] + '.webp'
            if file_name.endswith(('.jpg', '.jpeg', '.png')):
                # Convert to .webp first then remove the original image
                convert_to_webp(file_path, output_path)
                os.remove(file_path)
            elif file_name.endswith('.gif'):
                # Convert to .webp and archive the original .gif
                convert_to_webp(file_path, output_path)
                archive_gif(file_path, archive_dir)
            print(f"Processed {file_path}")

def process_archive(archive_path, image_archive_dir):
    process_images(archive_path, image_archive_dir)
    for root, dirs, files in os.walk(archive_path):
        for file_name in files:
            if file_name.endswith('.html'):
                file_path = os.path.join(root, file_name)
                if not os.path.basename(root).startswith('_'):  # Check if not in a directory starting with "_"
                    process_html_and_save(file_path)
                else:
                    remove_unwanted_elements_and_add_css(file_path)
                print(f"Processed {file_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process HTML files and images in the given directory. Archive GIF images to a default or specified directory.")
    parser.add_argument("archive_path", help="Directory containing the HTML files and images.")
    parser.add_argument("--image_archive_dir", default="./gifs", help="Directory to archive GIF images. Defaults to './gifs'.")
    args = parser.parse_args()

    process_archive(args.archive_path, args.image_archive_dir)
