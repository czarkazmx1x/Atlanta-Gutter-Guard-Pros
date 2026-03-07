import os
import re

# Branding replacements
BRAND_OLD = "Atlanta Gutter Guard Pros"
BRAND_NEW = "Atlanta Gutter Guard Quotes"

# Disclaimer to add to footers
DISCLAIMER_HTML = """<p style="font-size: 0.85rem; line-height: 1.5; opacity: 0.8; margin-top: 20px;">Atlanta Gutter Guard Quotes is a free service that helps homeowners connect with local contractors. All contractors are independent, and we do not guarantee or warrant any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. Persons depicted in photos and videos may be actors or models.</p>"""

# Header top-bar replacement
HEADER_TOP_OLD_RE = r'🏆 Atlanta\'s #1 Rated Gutter Guard Installers \| ⭐ 4\.8/5\s+Stars'
HEADER_TOP_NEW = "Compare Gutter Guard Quotes & Save | Fast Local Matches"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Basic brand replacement
    new_content = content.replace(BRAND_OLD, BRAND_NEW)

    # 2. Header Top Bar
    new_content = re.sub(HEADER_TOP_OLD_RE, HEADER_TOP_NEW, new_content)

    # 3. Remove Before & After section
    # Matches <section class="ba-section" ... </section>
    new_content = re.sub(r'<section class="ba-section".*?</section>', '', new_content, flags=re.DOTALL)

    # 4. Remove Google Reviews section
    new_content = re.sub(r'<section class="google-reviews".*?</section>', '', new_content, flags=re.DOTALL)

    # 5. Remove any direct installer claims in hero/benefits
    new_content = new_content.replace("installed by local experts", "connected with local installers")
    new_content = new_content.replace("Our micro-mesh", "Professional micro-mesh")
    new_content = new_content.replace("Our experienced crews", "Independent local crews")

    # 6. Update FAQs to referral tone
    new_content = new_content.replace("How much do gutter guards cost in", "How much does gutter guard installation cost in")
    new_content = new_content.replace("We offer free estimates", "Contractors in our network offer free estimates")
    
    # 7. Add Footer Disclaimer (if not present)
    if BRAND_NEW in new_content and "referral service" not in new_content.lower() and "independent contractors" not in new_content.lower():
        # Try to insert after the brand paragraph in the footer
        footer_brand_para = f'<p>{BRAND_NEW}</p>'
        if footer_brand_para in new_content:
             new_content = new_content.replace(footer_brand_para, footer_brand_para + "\n" + DISCLAIMER_HTML)
        else:
            # Fallback insertion before </footer>
            new_content = new_content.replace('</footer>', DISCLAIMER_HTML + '\n</footer>')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".html") and file != "index.html":
                if process_file(os.path.join(root, file)):
                    print(f"Updated: {file}")
                    count += 1
    print(f"Total files updated: {count}")
