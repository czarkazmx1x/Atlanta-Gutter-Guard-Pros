# Google Search Console Setup Helper Script
# Atlanta Gutter Guard Pros - SEO Submission Tools

param(
    [Parameter(Mandatory=$false)]
    [string]$Domain = "atlantagutterguardpros.com",
    
    [Parameter(Mandatory=$false)]
    [switch]$CheckSitemap,
    
    [Parameter(Mandatory=$false)]
    [switch]$TestPages,
    
    [Parameter(Mandatory=$false)]
    [switch]$GenerateReport
)

# Configuration
$BaseUrl = "https://$Domain"
$SitemapUrl = "$BaseUrl/sitemap.xml"
$LogFile = "$(Get-Date -Format 'yyyy-MM-dd')-seo-check.log"

# Priority pages to check
$PriorityPages = @(
    "$BaseUrl/",
    "$BaseUrl/services/",
    "$BaseUrl/service-areas/",
    "$BaseUrl/contact/",
    "$BaseUrl/about/"
)

# Function to log messages
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry
    Add-Content -Path $LogFile -Value $LogEntry
}

# Function to test URL accessibility
function Test-UrlAccessibility {
    param([string]$Url)
    
    try {
        Write-Log "Testing accessibility of: $Url"
        $Response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 10 -UseBasicParsing
        
        $Result = @{
            Url = $Url
            StatusCode = $Response.StatusCode
            StatusDescription = $Response.StatusDescription
            Accessible = $true
            ResponseTime = $Response.ResponseLength
        }
        
        Write-Log "✅ $Url - Status: $($Response.StatusCode)" "SUCCESS"
        return $Result
    }
    catch {
        $Result = @{
            Url = $Url
            StatusCode = "Error"
            StatusDescription = $_.Exception.Message
            Accessible = $false
            ResponseTime = 0
        }
        
        Write-Log "❌ $Url - Error: $($_.Exception.Message)" "ERROR"
        return $Result
    }
}

# Function to check sitemap
function Test-Sitemap {
    Write-Log "=== SITEMAP ANALYSIS ===" "INFO"
    
    $SitemapResult = Test-UrlAccessibility -Url $SitemapUrl
    
    if ($SitemapResult.Accessible) {
        try {
            $SitemapContent = Invoke-WebRequest -Uri $SitemapUrl -UseBasicParsing
            [xml]$SitemapXml = $SitemapContent.Content
            
            $UrlCount = 0
            if ($SitemapXml.urlset) {
                $UrlCount = $SitemapXml.urlset.url.Count
                Write-Log "Found $UrlCount URLs in sitemap" "SUCCESS"
                
                # Show first few URLs
                $SitemapXml.urlset.url | Select-Object -First 5 | ForEach-Object {
                    Write-Log "  - $($_.loc)" "INFO"
                }
                
                if ($UrlCount -gt 5) {
                    Write-Log "  ... and $($UrlCount - 5) more URLs" "INFO"
                }
            }
            elseif ($SitemapXml.sitemapindex) {
                $SitemapCount = $SitemapXml.sitemapindex.sitemap.Count
                Write-Log "Found sitemap index with $SitemapCount sitemaps" "SUCCESS"
                
                $SitemapXml.sitemapindex.sitemap | ForEach-Object {
                    Write-Log "  - $($_.loc)" "INFO"
                }
            }
            
            Write-Log "✅ Sitemap is valid XML and accessible" "SUCCESS"
        }
        catch {
            Write-Log "❌ Sitemap XML parsing failed: $($_.Exception.Message)" "ERROR"
        }
    }
    else {
        Write-Log "❌ Sitemap not accessible at $SitemapUrl" "ERROR"
        Write-Log "Please ensure sitemap.xml exists in your website root" "ERROR"
    }
}

# Function to test all priority pages
function Test-PriorityPages {
    Write-Log "=== PRIORITY PAGES ANALYSIS ===" "INFO"
    
    $Results = @()
    foreach ($Page in $PriorityPages) {
        $Result = Test-UrlAccessibility -Url $Page
        $Results += $Result
        Start-Sleep -Milliseconds 500  # Be respectful to the server
    }
    
    # Summary
    $AccessibleCount = ($Results | Where-Object { $_.Accessible }).Count
    $TotalCount = $Results.Count
    
    Write-Log "=== SUMMARY ===" "INFO"
    Write-Log "Accessible pages: $AccessibleCount / $TotalCount" "INFO"
    
    if ($AccessibleCount -eq $TotalCount) {
        Write-Log "✅ All priority pages are accessible" "SUCCESS"
    }
    else {
        Write-Log "⚠️  Some pages are not accessible" "WARNING"
        $Results | Where-Object { -not $_.Accessible } | ForEach-Object {
            Write-Log "❌ $($_.Url) - $($_.StatusDescription)" "ERROR"
        }
    }
    
    return $Results
}

# Main execution logic
Write-Log "=== ATLANTA GUTTER GUARD PROS SEO CHECKER ===" "INFO"
Write-Log "Domain: $Domain" "INFO"
Write-Log "Base URL: $BaseUrl" "INFO"
Write-Log "Sitemap URL: $SitemapUrl" "INFO"

if ($CheckSitemap) {
    Test-Sitemap
}
elseif ($TestPages) {
    Test-PriorityPages
}
else {
    # Run all checks by default
    Test-Sitemap
    Write-Log "" "INFO"
    Test-PriorityPages
}

Write-Log "=== SCRIPT COMPLETED ===" "INFO"
Write-Log "Log file: $LogFile" "INFO"
