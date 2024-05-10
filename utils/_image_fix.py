#!/usr/bin/env python3
import os
import imghdr
import sys
# Import logging module
import logging

def fix_file_suffixes(base_dir):
    # Counter for renamed files
    renamed_files = 0
    
    # Walk through all directories and files in the base directory
    for dirpath, dirnames, filenames in os.walk(base_dir):
        for filename in filenames:
            # Full path of the file
            file_path = os.path.join(dirpath, filename)
            
            # Check if the file ends with .html
            if file_path.endswith('.html'):
                # Determine the type of image
                image_type = imghdr.what(file_path)
                
                # If the image type is jpeg, rename the file
                if image_type == 'jpeg':
                    new_file_path = file_path[:-5] + '.jpeg'  # Change suffix to .jpeg
                    os.rename(file_path, new_file_path)  # Rename the file
                    renamed_files += 1
                    print(f"Renamed '{file_path}' to '{new_file_path}'")
            
            # Renaming 'index.jpeg' files
            if filename == 'index.jpeg':
                parent_dir = os.path.basename(dirpath)
                new_file_name = f"{parent_dir}.jpeg"
                new_file_path = os.path.join(os.path.dirname(dirpath), new_file_name)  # Move up one directory
                os.rename(file_path, new_file_path)
                print(f"Moved and renamed '{file_path}' to '{new_file_path}'")
                # Delete the original parent directory if empty
                if not os.listdir(dirpath):  # Check if the directory is empty
                    os.rmdir(dirpath)
                    print(f"Deleted empty directory '{dirpath}'")

    print(f"Total renamed files: {renamed_files}")

    return renamed_files

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python fix_jpegs.py <directory>")
        sys.exit(1)
    
    directory = sys.argv[1]
    renamed_count = fix_file_suffixes(directory)
    print(f"Total files renamed: {renamed_count}")
