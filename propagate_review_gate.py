import os
import re

# Snippet 1: The updated button logic
# Finding the "Write a Review" button and changing it to onclick="openReviewGate()"
# Also needs to be more robust to handle slightly different HTML versions if they exist
button_pattern = r'<a href="https://search.google.com/local/writereview\?placeid=PLACEHOLDER" target="_blank"\s+class="btn-review-outline">'
button_replacement = '<a href="javascript:void(0)" onclick="openReviewGate()" class="btn-review-outline">'

# Snippet 2: The Modal and Script
# This should be inserted before the closing </body> tag
modal_html = """
    <!-- Review Gate Modal -->
    <div id="review-gate-modal" class="rg-modal" aria-hidden="true">
        <div class="rg-overlay" onclick="closeReviewGate()"></div>
        <div class="rg-content">
            <button class="rg-close" onclick="closeReviewGate()" aria-label="Close">&times;</button>
            <div id="rg-step-1" class="rg-step">
                <h3>How was your experience?</h3>
                <p>Please rate our service to continue.</p>
                <div class="rg-stars">
                    <span class="rg-star" data-rating="1">★</span>
                    <span class="rg-star" data-rating="2">★</span>
                    <span class="rg-star" data-rating="3">★</span>
                    <span class="rg-star" data-rating="4">★</span>
                    <span class="rg-star" data-rating="5">★</span>
                </div>
            </div>
            <div id="rg-step-positive" class="rg-step" style="display:none;">
                <div class="rg-icon">✨</div>
                <h3>We're glad you're happy!</h3>
                <p>Would you mind sharing your experience on Google? It helps our small business a ton.</p>
                <div class="rg-actions">
                    <a href="https://search.google.com/local/writereview?placeid=ChIJ8_I7K8I6j4AR-7L4W6m8G6Y" target="_blank" class="rg-btn rg-btn-google">Continue to Google</a>
                </div>
            </div>
            <div id="rg-step-negative" class="rg-step" style="display:none;">
                <h3>We're sorry to hear that</h3>
                <p>We'd love to make it right. Please let us know what went wrong so we can fix it.</p>
                <form id="rg-feedback-form" action="https://formspree.io/f/PLACEHOLDER" method="POST">
                    <textarea name="feedback" placeholder="How can we help?" required></textarea>
                    <input type="email" name="email" placeholder="Your Email (Optional)">
                    <button type="submit" class="rg-btn">Send Feedback</button>
                    <div id="form-status"></div>
                </form>
            </div>
            <div id="rg-step-thanks" class="rg-step" style="display:none;">
                <div class="rg-icon">✅</div>
                <h3>Thank you!</h3>
                <p>We have received your feedback and will be in touch shortly.</p>
                <button class="rg-btn" onclick="closeReviewGate()">Close</button>
            </div>
        </div>
    </div>
    <script>
        function openReviewGate() { document.getElementById('review-gate-modal').style.display = 'flex'; resetReviewGate(); }
        function closeReviewGate() { document.getElementById('review-gate-modal').style.display = 'none'; }
        function resetReviewGate() { document.querySelectorAll('.rg-step').forEach(s => s.style.display = 'none'); document.getElementById('rg-step-1').style.display = 'block'; }
        document.querySelectorAll('.rg-star').forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                document.querySelectorAll('.rg-star').forEach(s => { s.style.color = s.getAttribute('data-rating') <= rating ? '#f59e0b' : '#ddd'; });
            });
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                document.getElementById('rg-step-1').style.display = 'none';
                if (rating >= 4) { document.getElementById('rg-step-positive').style.display = 'block'; }
                else { document.getElementById('rg-step-negative').style.display = 'block'; }
            });
        });
        document.getElementById('rg-feedback-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            btn.disabled = true; btn.innerText = 'Sending...';
            fetch(this.action, { method: 'POST', body: new FormData(this), headers: { 'Accept': 'application/json' }
            }).then(() => { document.getElementById('rg-step-negative').style.display = 'none'; document.getElementById('rg-step-thanks').style.display = 'block';
            }).catch(() => { btn.disabled = false; btn.innerText = 'Send Feedback'; });
        });
    </script>
"""

# Process all HTML files
for file_name in os.listdir('.'):
    if file_name.endswith('.html'):
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Update the button
        new_content = re.sub(button_pattern, button_replacement, content)
        
        # 2. Add the Modal (if not already present)
        if 'id="review-gate-modal"' not in new_content:
            new_content = new_content.replace('</body>', modal_html + '\n</body>')
            
        if new_content != content:
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Implemented Review Gate on: {file_name}")

print("Site-wide Review Gate implementation complete.")
