#!/bin/bash

# Check if a command line argument was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <base_directory>"
    exit 1
fi

# The first command line argument is the base directory containing 'en' and 'fr' folders
BASE_DIR=$1

# Loop over each language directory
for lang in "$BASE_DIR"/{en,fr}; do
    # Find all index.md files within the language directory
    find "$lang" -type f -name "index.md" | while read -r filepath; do
        # Extract directory components
        # Path format assumed: /lang/month/day/articletitle/index.md
        year=$(echo "$filepath" | cut -d'/' -f4)
        month=$(echo "$filepath" | cut -d'/' -f5)
        day=$(echo "$filepath" | cut -d'/' -f6)
        articletitle=$(echo "$filepath" | cut -d'/' -f7)

        # Define new file path without creating a new directory
        newfile="$lang/article/$year/$month/$day/${articletitle}.md"

        # Move file to the new location
        mv "$filepath" "$newfile"

        # Remove the old directory potentially containing extra content like 'feed'
        # Be very careful with this command to avoid deleting unintended data
        olddir=$(dirname "$filepath")
        rm -rf "$olddir"
    done
done

echo "Reorganization complete."
