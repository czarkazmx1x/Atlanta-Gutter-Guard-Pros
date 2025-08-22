@echo off
title Shopify Chatbot Setup

echo ========================================
echo   SHOPIFY CHATBOT DEPLOYMENT
echo ========================================
echo.

set /p BUSINESS_NAME="Enter your business name: "
if "%BUSINESS_NAME%"=="" set BUSINESS_NAME=Your Business

set /p PHONE="Enter your phone number: "
if "%PHONE%"=="" set PHONE=(555) 123-4567

set /p SERVICES="Enter your services: "
if "%SERVICES%"=="" set SERVICES=our products

set /p SHOPIFY_STORE="Enter your Shopify store URL: "
if "%SHOPIFY_STORE%"=="" set SHOPIFY_STORE=https://yourstore.myshopify.com

echo.
echo Creating Shopify deployment package...

mkdir shopify-chatbot-setup 2>nul

:: Create theme.liquid code
(
echo ^<!-- %BUSINESS_NAME% N8N Chatbot Integration --^>
echo ^<!-- Add this code to your theme.liquid file before the closing ^</body^> tag --^>
echo.
echo ^<!-- Load chatbot scripts --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
echo ^<!-- Shopify-specific business configuration --^>
echo ^<script^>
echo // Override business info for Shopify store
echo setTimeout^(function^(^) {
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo         window.BUSINESS_CONFIG.phone = "%PHONE%";
echo         window.BUSINESS_CONFIG.services = "%SERVICES%";
echo         window.BUSINESS_CONFIG.platform = "Shopify";
echo         window.BUSINESS_CONFIG.storeUrl = "%SHOPIFY_STORE%";
echo     }
echo }, 1000^);
echo ^</script^>
echo.
echo ^<!-- Shopify integration helpers --^>
echo ^<script^>
echo // Add cart information to chat context if available
echo if ^(typeof Shopify !== 'undefined' ^&^& Shopify.cart^) {
echo     window.shopifyCartData = {
echo         itemCount: Shopify.cart.item_count,
echo         totalPrice: Shopify.cart.total_price,
echo         currency: Shopify.currency.active
echo     };
echo }
echo ^</script^>
) > "shopify-chatbot-setup\theme-liquid-code.html"

:: Create Shopify-specific installation guide
(
echo # Shopify Chatbot Installation Guide
echo.
echo ## Installation Steps
echo.
echo ### 1. Access Your Theme Editor
echo 1. Go to your Shopify Admin
echo 2. Navigate to Online Store ^> Themes
echo 3. Click "Actions" ^> "Edit code" on your active theme
echo.
echo ### 2. Edit theme.liquid File
echo 1. In the file list, click on "Layout" folder
echo 2. Click on "theme.liquid" file
echo 3. Scroll to the bottom and find the closing `^</body^>` tag
echo 4. Paste the code from `theme-liquid-code.html` just before `^</body^>`
echo 5. Click "Save"
echo.
echo ### 3. Alternative: Upload as Assets ^(Optional^)
echo If you prefer to host files locally:
echo 1. Download the chatbot files from the main project
echo 2. In theme editor, go to "Assets" folder
echo 3. Click "Add a new asset"
echo 4. Upload the JavaScript files
echo 5. Reference them in theme.liquid:
echo ```liquid
echo {{ 'session-memory.js' ^| asset_url ^| script_tag }}
echo {{ 'chat-widget.js' ^| asset_url ^| script_tag }}
echo ```
echo.
echo ## Business Configuration
echo - Store Name: %BUSINESS_NAME%
echo - Phone: %PHONE%
echo - Services/Products: %SERVICES%
echo - Store URL: %SHOPIFY_STORE%
echo.
echo ## Features for E-commerce
echo The chatbot is configured to help with:
echo - Product inquiries
echo - Order support
echo - Shipping information
echo - Return/exchange policies
echo - General customer service
echo.
echo ## Testing
echo 1. Visit your store: %SHOPIFY_STORE%
echo 2. Chat widget should appear in bottom right corner
echo 3. Test with messages like:
echo    - "I need help with my order"
echo    - "Tell me about your products"
echo    - "What's your return policy?"
echo.
echo ## Customization Options
echo.
echo ### Custom Styling
echo Add to your theme's CSS file:
echo ```css
echo #n8n-business-chat {
echo     /* Match your store's branding */
echo     --primary-color: #your-brand-color;
echo }
echo ```
echo.
echo ### Product-Specific Responses
echo The AI can be trained to provide specific information about:
echo - Product features and benefits
echo - Pricing and promotions
echo - Stock availability
echo - Shipping times
echo - Size guides and specifications
echo.
echo ## Troubleshooting
echo.
echo **Chat doesn't appear:**
echo - Check browser console for errors
echo - Verify the code was pasted correctly
echo - Ensure theme allows custom scripts
echo.
echo **No AI responses:**
echo - Verify N8N webhook is active
echo - Check Cloudflare Worker deployment
echo - Test with simple messages first
echo.
echo **Shopify-specific issues:**
echo - Some themes may have script conflicts
echo - Try loading scripts in different order
echo - Consider using asset upload method
echo.
echo ## Advanced Integration
echo.
echo ### Cart Integration
echo The chatbot can access cart information to provide contextual help:
echo ```javascript
echo // Example: Customer asks about their cart
echo if ^(window.shopifyCartData^) {
echo     console.log^('Cart has', window.shopifyCartData.itemCount, 'items'^);
echo }
echo ```
echo.
echo ### Product Recommendations
echo Train your N8N AI to suggest products based on customer inquiries.
echo.
echo ### Order Status Integration
echo Connect with Shopify APIs to provide real-time order updates.
echo.
echo ## Support
echo For Shopify-specific questions:
echo 1. Check Shopify documentation
echo 2. Test on a development theme first
echo 3. Contact theme developer if conflicts occur
) > "shopify-chatbot-setup\SHOPIFY-INSTALLATION-GUIDE.md"

:: Create liquid template helpers
(
echo ^<!-- Shopify Liquid Helpers for Chatbot --^>
echo.
echo ^<!-- Get current product information --^>
echo {% if template contains 'product' %}
echo ^<script^>
echo window.currentProduct = {
echo     id: {{ product.id }},
echo     title: "{{ product.title ^| escape }}",
echo     price: "{{ product.price ^| money }}",
echo     available: {{ product.available }},
echo     type: "{{ product.type ^| escape }}"
echo };
echo ^</script^>
echo {% endif %}
echo.
echo ^<!-- Get customer information if logged in --^>
echo {% if customer %}
echo ^<script^>
echo window.customerInfo = {
echo     name: "{{ customer.first_name ^| escape }}",
echo     email: "{{ customer.email ^| escape }}",
echo     orderCount: {{ customer.orders_count }}
echo };
echo ^</script^>
echo {% endif %}
echo.
echo ^<!-- Get cart information --^>
echo ^<script^>
echo window.cartInfo = {
echo     itemCount: {{ cart.item_count }},
echo     totalPrice: "{{ cart.total_price ^| money }}",
echo     isEmpty: {{ cart.item_count ^| json }}
echo };
echo ^</script^>
) > "shopify-chatbot-setup\liquid-helpers.html"

echo ✅ Created Shopify deployment package!
echo.
echo 📁 Files created in shopify-chatbot-setup/:
echo   - theme-liquid-code.html (code for theme.liquid)
echo   - SHOPIFY-INSTALLATION-GUIDE.md (detailed instructions)
echo   - liquid-helpers.html (optional Shopify integration helpers)
echo.
echo 🚀 Next steps:
echo 1. Open shopify-chatbot-setup folder
echo 2. Follow SHOPIFY-INSTALLATION-GUIDE.md
echo 3. Edit your theme.liquid file
echo 4. Test on your Shopify store: %SHOPIFY_STORE%
echo.

set /p OPEN_FOLDER="Open the setup folder now? (y/N): "
if /i "%OPEN_FOLDER%"=="y" (
    start "" "shopify-chatbot-setup"
)

echo.
echo ✅ Shopify chatbot setup ready!
echo Your chatbot will help customers with product questions and support!
pause
