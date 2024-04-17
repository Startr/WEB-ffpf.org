#!/bin/bash

# Check if a command line argument was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <base_directory>"
    exit 1
fi

# Remove trailing slash from the base directory if present and assign to BASE_DIR
BASE_DIR="${1%/}"

# Loop over each language directory
for lang in "$BASE_DIR"/{en,fr}; do
    # Find all index.md files within the language directory
    find "$lang" -type f -name "index.md" | while read -r filepath; do
        # Extract directory components
        year=$(echo "$filepath" | cut -d'/' -f5)
        month=$(echo "$filepath" | cut -d'/' -f6)
        day=$(echo "$filepath" | cut -d'/' -f7)
        articletitle=$(echo "$filepath" | cut -d'/' -f8)

        # Define new file path based on the original title directory
        newfile="$lang/article/$year/$month/$day/${articletitle}.md"

        # Move file to the new location
        mv "$filepath" "$newfile"

        # Attempt to remove the old directory, it will fail silently if not empty
        olddir=$(dirname "$filepath")
        rmdir --ignore-fail-on-non-empty "$olddir"
    done
done

echo "Reorganization complete."
