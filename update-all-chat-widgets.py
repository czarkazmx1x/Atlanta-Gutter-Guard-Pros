import os
import re

def update_all_pages_with_ai_chat():
    """
    Replace Chatwoot widgets with n8n AI chatbot on all HTML pages
    """
    
    # Get all HTML files in the directory
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Patterns to find and replace
    chatwoot_patterns = [
        # Pattern 1: Full Chatwoot script blocks
        r'// Chatwoot.*?(?=</script>|$)',
        r'/\* Chatwoot.*?\*/',
        r'<!-- Chatwoot.*?-->',
        
        # Pattern 2: Chat widget scripts
        r'<script[^>]*>.*?chatwoot.*?</script>',
        r'<script[^>]*>.*?chat.*?widget.*?</script>',
        
        # Pattern 3: Inline chat widgets
        r'\(function\(\)\s*{.*?chat.*?widget.*?}\)\(\);?',
        r'var btn = document\.createElement.*?appendChild\(btn\);',
        
        # Pattern 4: Contact widgets
        r'<!-- Contact Widget -->.*?</script>',
    ]
    
    # Replacement content
    replacement = '''<!-- Atlanta Gutter Guard Pros AI Chatbot -->
<script src="atlanta-gutter-ai-chat.js"></script>'''
    
    updated_files = []
    
    for html_file in html_files:
        try:
            # Read file content
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            original_content = content
            
            # Apply all pattern replacements
            for pattern in chatwoot_patterns:
                content = re.sub(pattern, replacement, content, flags=re.DOTALL | re.IGNORECASE)
            
            # Remove duplicate AI chatbot scripts (in case multiple replacements happened)
            content = re.sub(
                r'(<!-- Atlanta Gutter Guard Pros AI Chatbot -->.*?<script src="atlanta-gutter-ai-chat\.js"></script>\s*){2,}',
                replacement,
                content,
                flags=re.DOTALL
            )
            
            # Only write if content changed
            if content != original_content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files.append(html_file)
                print(f"[UPDATED]: {html_file}")
            else:
                print(f"[NO CHANGE]: {html_file}")
                
        except Exception as e:
            print(f"[ERROR] processing {html_file}: {str(e)}")
    
    return updated_files

if __name__ == "__main__":
    print("Updating Atlanta Gutter Guard Pros website with AI chatbot...")
    print("Processing HTML files...")
    
    updated = update_all_pages_with_ai_chat()
    
    print(f"\nProcess completed!")
    print(f"Updated {len(updated)} files:")
    for file in updated:
        print(f"   • {file}")
    
    print(f"\nNext steps:")
    print(f"   1. Set up your n8n workflows")
    print(f"   2. Get your webhook URL")
    print(f"   3. Update N8N_WEBHOOK_URL in atlanta-gutter-ai-chat.js")
    print(f"   4. Test the chatbot on your website")
    print(f"\nYour AI chatbot is ready to generate leads 24/7!")
