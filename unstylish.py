#!/usr/bin/env python3

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
        img['src'] = os.path.splitext(img_src)[0] + '.webp'

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

    update_image_urls(soup)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(format_prettify(soup))

def process_images(directory, archive_dir):
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if file_name.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                file_path = os.path.join(root, file_name)
                output_path = os.path.splitext(file_path)[0] + '.webp'
                
                if file_name.endswith('.gif'):
                    archive_gif(file_path, archive_dir)
                else:
                    os.remove(file_path)

                convert_to_webp(file_path, output_path)

def process_archive(archive_path, image_archive_dir):
    process_images(archive_path, image_archive_dir)
    for root, dirs, files in os.walk(archive_path):
        for file_name in files:
            if file_name.endswith('.html'):
                file_path = os.path.join(root, file_name)
                remove_unwanted_elements_and_add_css(file_path)
                print(f"Processed {file_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process HTML files and images in the given directory.")
    parser.add_argument("archive_path", help="Directory containing the HTML files and images.")
    parser.add_argument("image_archive_dir", help="Directory to archive GIF images.")
    args = parser.parse_args()

    process_archive(args.archive_path, args.image_archive_dir)
