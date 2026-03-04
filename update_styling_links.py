import os

def update_html_files(directory):
    # New V2 Font Link with Outfit + Inter
    font_link = '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">'
    css_link = '<link rel="stylesheet" href="styles.css">'

    count = 0
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                modified = False

                # Check and add/update Font Link
                # If the old Inter link exists, replace it. If not, insert/check.
                old_inter_link = 'family=Inter:wght@300;400;500;600;700&display=swap'
                
                if 'family=Outfit' not in new_content:
                    if old_inter_link in new_content:
                        # Replace old line with new one
                        # Regex might be safer, but let's try a broad split/replace if line matches well
                        # Or just find the line containing "fonts.googleapis.com/css2"
                        lines = new_content.split('\n')
                        for i, line in enumerate(lines):
                            if 'fonts.googleapis.com/css2' in line and 'Inter' in line:
                                lines[i] = font_link.strip() # Replace the line
                                modified = True
                                break
                        if modified:
                            new_content = '\n'.join(lines)
                    elif '</head>' in new_content:
                         # Fallback for pages without fonts
                        new_content = new_content.replace('</head>', f'{font_link}\n    </head>')
                        modified = True

                # Check and add CSS Link
                if 'styles.css' not in new_content:
                    if '</head>' in new_content:
                         new_content = new_content.replace('</head>', f'{css_link}\n    </head>')
                         modified = True

                if modified:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filename}")
                    count += 1
                else:
                    print(f"No changes needed for {filename}")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

    print(f"Total files updated: {count}")

if __name__ == "__main__":
    update_html_files('.')
