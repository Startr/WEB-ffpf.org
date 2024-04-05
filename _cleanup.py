#!/usr/bin/env python3

import os
import sys
import pickle
from bs4 import BeautifulSoup
import difflib

def get_directory_paths(start_path):
    paths = []
    for root, dirs, files in os.walk(start_path):
        for dir in dirs:
            full_path = os.path.join(root, dir)
            formatted_path = full_path[len(start_path):] if full_path.startswith(start_path) else full_path
            paths.append(formatted_path if formatted_path.startswith('/') else '/' + formatted_path)
    return paths

def load_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return BeautifulSoup(file.read(), 'lxml')

def save_html_file(soup, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def find_broken_links(soup):
    return soup.find_all('a', href=lambda href: href and '?' in href)

def get_closest_path(query, paths, link_decisions):
    if query in link_decisions:
        return link_decisions[query]
    matches = difflib.get_close_matches(query, paths, n=1, cutoff=0.1)
    return matches[0] if matches else None

def update_link_href(link, new_href, link_decisions):
    original_href = link['href']
    if original_href in link_decisions:
        link['href'] = link_decisions[original_href]
        return

    link_text = link.get_text(strip=True) or "No Text"
    print(f"Link Text: '{link_text}'")
    suggestion = new_href
    print(f"Suggested Path: {suggestion}")
    confirmation = input(f"Replace {original_href} with {suggestion}? (Enter for yes, type a new path, or 'n' to skip): ")

    if confirmation == '':
        link_decisions[original_href] = suggestion
        link['href'] = suggestion
        print(f"Updated to: {suggestion}")
    elif confirmation.lower() != 'n':
        link_decisions[original_href] = confirmation
        link['href'] = confirmation
        print(f"Updated to: {confirmation}")
    else:
        print("No change made.")

def process_html_files(start_path, paths, link_decisions):
    state_file = 'script_state.pkl'

    for root, dirs, files in os.walk(start_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                print(f"Processing: {file_path}")
                soup = load_html_file(file_path)
                broken_links = find_broken_links(soup)

                for link in broken_links:
                    query = link['href'].split('?')[0]
                    closest_path = get_closest_path(query, paths, link_decisions)
                    if closest_path is not None:
                        update_link_href(link, closest_path, link_decisions)

                save_html_file(soup, file_path)

    with open(state_file, 'wb') as f:
        pickle.dump(link_decisions, f)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        start_path = sys.argv[1]
    else:
        start_path = input("Enter the path to the archive directory: ").strip()

    paths = get_directory_paths(start_path)

    link_decisions = {}
    state_file = 'script_state.pkl'
    if os.path.exists(state_file):
        with open(state_file, 'rb') as f:
            link_decisions = pickle.load(f)

    process_html_files(start_path, paths, link_decisions)
