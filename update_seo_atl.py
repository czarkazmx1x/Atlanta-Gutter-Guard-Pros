import os
import re

# Configuration
BASE_DIR = r'c:\Atlanta-Gutter-Guard-Pros-Updated'
CSS_LINK = '    <link rel="stylesheet" href="styles-v4.css">\n'
TRACKING_SCRIPT = '<script src="js/tracking.js"></script>'

PERFORMANCE_META = """    <!-- Performance Optimization: Preconnect to critical domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <meta name="google-site-verification" content="oXrtEq4U_a-CSmwdGes-R7jMTiY7fDZAj9NQUg0hVys" />
"""

FOOTER_GRID = """
            <!-- Areas We Serve Footer Grid -->
            <div class="areas-serve-footer" style="padding: 3rem 0; background: #111; color: #fff; border-top: 1px solid #333;">
                <div class="container">
                    <h3 style="text-align: center; margin-bottom: 2rem;">Our Atlanta Service Areas</h3>
                    <div class="footer-areas-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                        <div class="footer-area-item"><a href="gutter-guards-marietta-ga.html" style="color: #ccc; text-decoration: none;">Marietta, GA</a></div>
                        <div class="footer-area-item"><a href="gutter-guards-roswell-ga.html" style="color: #ccc; text-decoration: none;">Roswell, GA</a></div>
                        <div class="footer-area-item"><a href="leaf-filter-installation-alpharetta.html" style="color: #ccc; text-decoration: none;">Alpharetta, GA</a></div>
                        <div class="footer-area-item"><a href="gutter-guards-sandy-springs-ga.html" style="color: #ccc; text-decoration: none;">Sandy Springs, GA</a></div>
                        <div class="footer-area-item"><a href="gutter-guards-johns-creek-ga.html" style="color: #ccc; text-decoration: none;">Johns Creek, GA</a></div>
                        <div class="footer-area-item"><a href="brookhaven-gutter-guards.html" style="color: #ccc; text-decoration: none;">Brookhaven, GA</a></div>
                        <div class="footer-area-item"><a href="smyrna-gutter-guards.html" style="color: #ccc; text-decoration: none;">Smyrna, GA</a></div>
                        <div class="footer-area-item"><a href="kennesaw-gutter-guards.html" style="color: #ccc; text-decoration: none;">Kennesaw, GA</a></div>
                    </div>
                    
                    <div class="footer-tools-grid" style="margin-top: 2rem; border-top: 1px solid #333; padding-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4>Tools & Savings</h4>
                            <a href="gutter-guard-cost-calculator.html" style="color: #ccc; text-decoration: none;">Gutter Guard Cost Calculator</a><br>
                            <a href="review.html" style="color: #ccc; text-decoration: none;">Rate Our Service</a>
                        </div>
                        <div>
                            <h4>Gutter Guard Advice</h4>
                            <a href="blog/gutter-guards-vs-cleaning-atlanta.html" style="color: #ccc; text-decoration: none;">Guards vs Cleaning: ROI Study</a><br>
                            <a href="blog/top-gutter-guards-pine-needles.html" style="color: #ccc; text-decoration: none;">Top Guards for Pine Needles</a>
                        </div>
                    </div>
                </div>
            </div>
"""

LANDMARKS = {
    'Roswell': ['Roswell Mill', 'Vickery Creek Falls', 'Barrington Hall'],
    'Marietta': ['Marietta Square', 'Kennesaw Mountain', 'The Big Chicken'],
    'Alpharetta': ['Avalon', 'Wills Park', 'Ameris Bank Amphitheatre'],
    'Sandy Springs': ['Heritage Sandy Springs', 'Abernathy Greenway'],
    'Brookhaven': ['Oglethorpe University', 'Murphey Candler Park'],
    'Atlanta': ['Piedmont Park', 'The Beltline', 'Ponce City Market'],
    'Johns Creek': ['Autrey Mill Nature Preserve', 'Newtown Park'],
    'Lawrenceville': ['Gwinnett Historic Courthouse', 'Rhodes Jordan Park'],
    'Milton': ['Birmingham Park', 'Milton City Hall'],
    'Woodstock': ['Olde Rope Mill Park', 'Dixie Speedway']
}

LOCAL_HIGHLIGHTS_TEMPLATE = """
            <div class="local-highlights" style="margin: 3rem 0; padding: 2rem; background: #f8fafc; border: 1px dashed #cbd5e0; border-radius: 8px;">
                <h3>Neighborhood Relevance: {city}</h3>
                <p>Expert gutter protection serving homeowners near these {city} landmarks:</p>
                <div style="margin-top: 1rem;">
                    {landmarks_html}
                </div>
            </div>
"""

GALLERY_TEMPLATE = """
    <section class="gallery-section" style="padding: 4rem 0; background: #fff;">
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 3rem;">Recent Projects in {city}, GA</h2>
            <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div class="gallery-item" style="background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                    <img src="/images/gallery/gallery_1.png" alt="Micro-mesh gutter guards in {city}" style="width: 100%; height: 250px; object-fit: cover;">
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; color: #1a5c34; margin-bottom: 0.5rem;">Brick Home Protection in {city}</h3>
                        <p style="font-size: 0.95rem; color: #666; line-height: 1.6;">Premium micro-mesh installation blending perfectly into the white trim of this {city} home.</p>
                    </div>
                </div>
                <div class="gallery-item" style="background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                    <img src="/images/gallery/gallery_2.png" alt="Farmhouse gutter guards in {city}" style="width: 100%; height: 250px; object-fit: cover;">
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; color: #1a5c34; margin-bottom: 0.5rem;">Farmhouse Safety in {city}</h3>
                        <p style="font-size: 0.95rem; color: #666; line-height: 1.6;">A premium screen guard installed cleanly onto a {city} farmhouse, keeping sightlines sharp and modern.</p>
                    </div>
                </div>
                <div class="gallery-item" style="background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
                    <img src="/images/gallery/gallery_3.png" alt="Wooded lot protection in {city}" style="width: 100%; height: 250px; object-fit: cover;">
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; color: #1a5c34; margin-bottom: 0.5rem;">{city} Wooded Lot Solution</h3>
                        <p style="font-size: 0.95rem; color: #666; line-height: 1.6;">Surrounded by local canopy, this {city} home is now 100% protected from falling leaf debris.</p>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                <a href="gallery.html" style="color: #1a5c34; font-weight: 700; text-decoration: none; border-bottom: 2px solid #1a5c34;">View Full Project Gallery →</a>
            </div>
        </div>
    </section>
"""

BA_SECTION_TEMPLATE = """
        <!-- ═══ BEFORE & AFTER ═══ -->
        <section class="ba-section" id="gallery" aria-labelledby="gallery-heading" style="padding: 4rem 0; background: #fff;">
            <div class="container">
                <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
                    <div class="section-eyebrow" style="color: #e85d04; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Visual Proof</div>
                    <h2 id="gallery-heading" style="font-size: 2.5rem; color: #1a5c34; margin-bottom: 1rem;">Before &amp; After in {city}</h2>
                    <p class="section-subtitle" style="font-size: 1.1rem; color: #666;">Drag the slider — see the difference our gutter guards make for {city} homes</p>
                </div>
                <div class="ba-layout" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: start;">
                    <div class="ba-sliders-col">
                        <div class="ba-slider" id="slider1" style="position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); aspect-ratio: 4/3;">
                            <div class="ba-before" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"><img src="images/gallery/before-1.jpg" alt="Clogged gutters in {city}" style="width: 100%; height: 100%; object-fit: cover;"><span class="ba-label" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.6); color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">Before</span></div>
                            <div class="ba-after" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border-left: 2px solid #fff;"><img src="images/gallery/after-1.jpg" alt="Clean gutters in {city}" style="width: 100%; height: 100%; object-fit: cover;"><span class="ba-label" style="position: absolute; top: 10px; right: 10px; background: #22c55e; color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">After</span></div>
                            <div class="ba-handle" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 40px; margin-left: -20px; cursor: ew-resize; display: flex; align-items: center; justify-content: center; z-index: 10;">
                                <div style="width: 4px; height: 100%; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>
                                <div style="position: absolute; width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a5c34" stroke-width="3"><path d="M8 5l-7 7 7 7M16 5l7 7-7 7"/></svg></div>
                            </div>
                        </div>
                    </div>
                    <div class="ba-bullets-col">
                        <div class="ba-bullets-group" style="margin-bottom: 2rem;">
                            <h3 style="color: #ef4444; margin-bottom: 1rem;">❌ Before</h3>
                            <ul style="list-style: none; padding: 0; color: #666; font-size: 1rem;">
                                <li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">•</span> Clogged with leaves & pine needles</li>
                                <li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">•</span> Water overflowing onto foundation</li>
                                <li style="margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">•</span> Costly professional cleanings required</li>
                            </ul>
                        </div>
                        <div class="ba-bullets-group">
                            <h3 style="color: #22c55e; margin-bottom: 1rem;">✅ After</h3>
                            <ul style="list-style: none; padding: 0; color: #1a5c34; font-weight: 600;">
                                <li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">✓</span> Clean, free-flowing gutters always</li>
                                <li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">✓</span> No more dangerous ladder climbing</li>
                                <li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0;">✓</span> Transferable lifetime warranty</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <script>(function(){{function i(el){{var b=el.querySelector('.ba-before'),h=el.querySelector('.ba-handle'),p=50;function s(v){{p=Math.max(2,Math.min(98,v));b.style.width=p+'%';h.style.left=p+'%';}}s(50);var d=false;h.addEventListener('mousedown',function(e){{d=true;e.preventDefault();}});h.addEventListener('touchstart',function(e){{d=true;}},{{passive:true}});document.addEventListener('mousemove',function(e){{if(!d)return;var r=el.getBoundingClientRect();s(((e.clientX-r.left)/r.width)*100);}});document.addEventListener('touchmove',function(e){{if(!d)return;var r=el.getBoundingClientRect();s(((e.touches[0].clientX-r.left)/r.width)*100);}},{{passive:true}});document.addEventListener('mouseup',function(){{d=false;}});document.addEventListener('touchend',function(){{d=false;}});}}document.querySelectorAll('.ba-slider').forEach(i);}})();</script>
        </section>
"""

TRUST_SIDEBAR_TEMPLATE = """
    <div class="trust-sidebar" style="position: fixed; left: 20px; top: 50%; transform: translateY(-50%); width: 180px; background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 900; text-align: center; border-top: 4px solid #1a5c34;">
        <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">Atlanta's Top Rated</h4>
        <span style="font-size: 1.5rem; font-weight: 800; display: block;">4.8/5</span>
        <div style="color: #ffc107; font-size: 0.8rem; margin-bottom: 1rem;">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p style="font-size: 0.75rem; font-style: italic; color: #666;">"Best investment for my Roswell home. No more clogs!"</p>
    </div>
"""

def update_file(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Page Metadata
    page_name = filename.replace('.html', '').replace('-', ' ').title()
    if filename == 'index.html': page_name = 'Home'

    # 1b. Inject/Update Performance Meta (including GSC tag)
    if 'google-site-verification' not in content:
        if 'Performance Optimization' in content:
            content = re.sub(r'<!-- Performance Optimization:.*?-->.*?</head>', PERFORMANCE_META + '</head>', content, flags=re.DOTALL | re.IGNORECASE)
        elif '<title>' in content:
            content = re.sub(r'(<title>.*?</title>)', r'\1\n' + PERFORMANCE_META, content, flags=re.IGNORECASE)

    # 1bi. Tracking Script
    if 'js/tracking.js' not in content:
        if '</head>' in content:
            content = content.replace('</head>', TRACKING_SCRIPT + '\n</head>')
        elif '<body' in content:
             content = re.sub(r'(<body)', TRACKING_SCRIPT + r'\n\1', content, flags=re.IGNORECASE)

    # 1c. Trust Sidebar
    if filename != 'index.html' and 'trust-sidebar' not in content:
        content = content.replace('</body>', TRUST_SIDEBAR_TEMPLATE + '\n</body>')

    # 1d. Hyper-Local Landmarks
    target_city = None
    for city in LANDMARKS.keys():
        if city.lower() in filename.lower() or city.lower() in content.lower()[:2000]:
            target_city = city
            break
    
    if target_city and 'local-highlights' not in content:
        landmarks_html = "".join([f'<span style="display:inline-block; background:#fff; padding:4px 12px; border-radius:20px; font-size:0.85rem; margin-right:5px; box-shadow:0 2px 5px rgba(0,0,0,0.05); font-weight:600; color:#1a5c34;">{l}</span>' for l in LANDMARKS[target_city]])
        highlights_block = LOCAL_HIGHLIGHTS_TEMPLATE.format(city=target_city, landmarks_html=landmarks_html)
        if '<footer' in content:
            content = re.sub(r'(<footer.*?>)', highlights_block + r'\n\1', content, flags=re.IGNORECASE)

    # 1e. Localized Gallery
    if target_city and filename != 'index.html' and filename != 'gallery.html' and 'gallery-section' not in content:
        gallery_block = GALLERY_TEMPLATE.format(city=target_city)
        if '<section class="section"' in content:
            content = re.sub(r'(</section>)', r'\1' + gallery_block, content, count=1, flags=re.IGNORECASE)
        elif '<footer' in content:
            content = re.sub(r'(<footer.*?>)', gallery_block + r'\n\1', content, flags=re.IGNORECASE)

    # 1f. Localized Gallery Captions
    if target_city:
        def localize_gallery(match):
            header = match.group(1)
            # Clean up existing double localization artifacts
            header = re.sub(rf'\b{target_city}\b\s+in\s+\b{target_city}\b', target_city, header, flags=re.IGNORECASE)
            
            # Prevent redundant injection if city or "GA" already present in a clean way
            if target_city.lower() in header.lower() or "ga" in header.lower():
                return f"<h3>{header}</h3>"
            
            mapping = {
                "Brick Suburban Beauty": f"Brick Home Protection in {target_city}",
                "Modern Farmhouse Protection": f"Farmhouse Safety in {target_city}",
                "Heavy Canopy Solution": f"{target_city} Wooded Lot Gutter Guards",
                "Stainless Steel Micro-Mesh Focus": f"Premium Mesh Install: {target_city}"
            }
            new_header = mapping.get(header, f"{header} in {target_city}")
            return f"<h3>{new_header}</h3>"
        
        content = re.sub(r'<h3>(.*?)</h3>', localize_gallery, content, flags=re.IGNORECASE)

    # 1f2. Inject Localized Before & After
    if target_city and filename != 'index.html' and 'ba-section' not in content:
        ba_block = BA_SECTION_TEMPLATE.format(city=target_city)
        if 'gallery-section' in content:
            content = content.replace('</section>', '</section>\n' + ba_block, 1)
        elif '<footer' in content:
            content = re.sub(r'(<footer.*?>)', ba_block + r'\n\1', content, flags=re.IGNORECASE)

    # 1g. Localized Trust Sidebar Snippet
    if target_city and 'trust-sidebar' in content:
        trust_quotes = {
            'Marietta': '"Best investment for my Marietta home near the Square. No more clogs!"',
            'Roswell': '"Best investment for my Roswell home. No more clogs!"',
            'Alpharetta': '"Flawless service in Alpharetta. The micro-mesh is a game changer."',
            'Sandy Springs': '"Great experience in Sandy Springs. Highly recommend these guys!"',
            'Atlanta': '"The beltline area has so many trees, these guards are a lifesaver in Atlanta."'
        }
        quote = trust_quotes.get(target_city, f'"Best gutter guard installation in {target_city}!"')
        content = re.sub(r'<p style="font-size: 0.75rem; font-style: italic; color: #666;">".*?"</p>', 
                         f'<p style="font-size: 0.75rem; font-style: italic; color: #666;">{quote}</p>', 
                         content, flags=re.DOTALL)

    # 1h. Image Alt Tags
    def add_alt_tags(match):
        img_tag = match.group(0)
        keywords = f"Gutter Guards in {target_city or 'Atlanta'} - Atlanta Gutter Guard Pros"
        if 'alt=' not in img_tag or 'alt=""' in img_tag or 'alt="Placeholder"' in img_tag:
            if 'alt="' in img_tag:
                return re.sub(r'alt=".*?"', f'alt="{keywords}"', img_tag)
            return img_tag.replace('<img', f'<img alt="{keywords}"')
        return img_tag

    content = re.sub(r'<img[^>]+>', add_alt_tags, content, flags=re.IGNORECASE)

    # 2. Inject Footer
    if 'areas-serve-footer' not in content:
        if '<footer' in content:
            content = re.sub(r'(<footer.*?>)', FOOTER_GRID + r'\n\1', content, flags=re.IGNORECASE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

def main():
    html_files = [f for f in os.listdir(BASE_DIR) if f.endswith('.html')]
    for filename in html_files:
        filepath = os.path.join(BASE_DIR, filename)
        update_file(filepath)

if __name__ == "__main__":
    main()
