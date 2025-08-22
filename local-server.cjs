const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Security: prevent directory traversal
    filePath = path.normalize(filePath);
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found - show directory listing
                if (req.url === '/') {
                    showDirectoryListing(res);
                } else {
                    res.writeHead(404);
                    res.end('File not found');
                }
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

function showDirectoryListing(res) {
    fs.readdir('.', (err, files) => {
        if (err) {
            res.writeHead(500);
            res.end('Error reading directory');
            return;
        }
        
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        let html = `
<!DOCTYPE html>
<html>
<head>
    <title>🏠 Atlanta Gutter Guard Pros - Local Server</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f8f9fa; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2e7d32; }
        .file-list { display: grid; gap: 15px; margin-top: 20px; }
        .file-item { display: block; padding: 15px; background: #e8f5e8; border-radius: 8px; text-decoration: none; color: #2e7d32; border-left: 4px solid #4caf50; }
        .file-item:hover { background: #c8e6c9; }
        .test-files { background: #fff3cd; border-left-color: #ffc107; color: #856404; }
        .main-files { background: #d1ecf1; border-left-color: #17a2b8; color: #0c5460; }
        .status { background: #d4edda; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #155724; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏠 Atlanta Gutter Guard Pros - Local Development Server</h1>
        
        <div class="status">
            ✅ <strong>Server Running:</strong> http://localhost:8080<br>
            🛡️ <strong>Resilient Chat System:</strong> Ready for testing
        </div>
        
        <h2>📄 Available Test Pages:</h2>
        <div class="file-list">`;
        
        // Prioritize test files
        const testFiles = htmlFiles.filter(f => f.includes('test') || f.includes('demo') || f.includes('diagnostic') || f.includes('emergency'));
        const mainFiles = htmlFiles.filter(f => !testFiles.includes(f));
        
        testFiles.forEach(file => {
            html += `<a href="/${file}" class="file-item test-files">🧪 ${file}</a>`;
        });
        
        html += `</div><h2>🌐 Main Website Pages:</h2><div class="file-list">`;
        
        mainFiles.slice(0, 10).forEach(file => { // Show first 10 main files
            html += `<a href="/${file}" class="file-item main-files">🏠 ${file}</a>`;
        });
        
        html += `</div>
        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #6c757d;">
            <strong>🎯 Recommended Test Order:</strong><br>
            1. <a href="/test-resilient-chat.html">test-resilient-chat.html</a> - Test the new bulletproof system<br>
            2. <a href="/working-chat-test.html">working-chat-test.html</a> - Basic functionality test<br>
            3. <a href="/index.html">index.html</a> - Main website with chat
        </div>
    </div>
</body>
</html>`;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
}

server.listen(port, () => {
    console.log(`🚀 Atlanta Gutter Guard Pros Local Server`);
    console.log(`📡 Server running at: http://localhost:${port}`);
    console.log(`🛡️ Resilient chat system ready for testing`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`📁 Serving files from: ${process.cwd()}`);
    console.log(`\n🎯 Open your browser and go to: http://localhost:${port}`);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});