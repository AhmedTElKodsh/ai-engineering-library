# Web Scraping Specialization Track

**Track Type**: Optional Specialization  
**Target Audience**: AI Engineers, Data Analysts, Data Scientists  
**Prerequisites**: Module 0 (Python Foundations) completed  
**Duration**: 2-3 weeks (40-60 hours)  
**Projects**: 5 progressive projects  
**Pedagogical Approach**: Socratic mentorship with Discovery Exercises

## Overview

The Web Scraping Specialization Track teaches data collection techniques through 5 progressive projects. Learners master static extraction, pagination, dynamic content handling, session management, and spidering using industry-standard tools (requests, BeautifulSoup, Playwright, Selenium, Scrapy).

This track uses **Discovery Exercises** (Requirement 45) - providing architectural guidance, boilerplate code with TODO blocks, and progressive hints without complete solutions. Learners develop problem-solving skills by discovering implementations themselves.

## Learning Objectives

By completing this specialization track, learners will be able to:

1. Extract data from static HTML pages using requests and BeautifulSoup
2. Handle pagination and navigate multi-page websites programmatically
3. Scrape dynamic content loaded via JavaScript using Playwright or Selenium
4. Manage sessions, cookies, and authentication for stateful scraping
5. Build scalable web crawlers using Scrapy framework
6. Implement ethical scraping practices (robots.txt, rate limiting, legal compliance)
7. Structure scraped data for analysis (CSV, JSON, database formats)
8. Debug scraping issues and handle edge cases

## Tool Progression

```
Project 1: requests + BeautifulSoup (fundamentals)
    ↓
Project 2: requests + BeautifulSoup (pagination)
    ↓
Project 3: Playwright/Selenium (dynamic content)
    ↓
Project 4: requests + sessions (authentication)
    ↓
Project 5: Scrapy (scalable crawling)
```

## Ethical Scraping Principles

**Before starting any project, learners must:**

1. ✅ Check robots.txt file for scraping permissions
2. ✅ Implement rate limiting (1-2 seconds between requests minimum)
3. ✅ Respect website terms of service
4. ✅ Use official APIs when available
5. ✅ Avoid authentication bypass or terms violations
6. ✅ Consider data privacy and GDPR compliance
7. ✅ Provide proper attribution when using scraped data
8. ✅ Identify and respect copyright and intellectual property

**Legal Targets**: All projects use websites that permit scraping or are designated practice sites.

---

## Project 1: Static Content Extraction

### Overview

**Title**: Product Catalog Scraper  
**Primary Tools**: requests, BeautifulSoup  
**Learning Objective**: Extract structured data from static HTML pages  
**Duration**: 6-8 hours

### Target Website

**URL**: `https://books.toscrape.com/`  
**Type**: Static HTML practice site  
**Permissions**: Designed for scraping practice

### Success Criteria

Extract book data and output CSV with these columns:
- `title` (string)
- `price` (float, converted from £ to numeric)
- `availability` (string: "In stock" or "Out of stock")
- `rating` (integer: 1-5 stars)
- `url` (string: full product URL)

**Minimum**: 20 books extracted  
**Format**: `books.csv` with proper headers

### Architectural Guidance

**High-Level Approach**:
1. Send HTTP GET request to target URL
2. Parse HTML response with BeautifulSoup
3. Locate book containers using CSS selectors or XPath
4. Extract data fields from each container
5. Clean and transform data (price conversion, rating parsing)
6. Write structured data to CSV

**Why These Tools?**:
- `requests`: Simple, reliable HTTP library for static content
- `BeautifulSoup`: Intuitive HTML parsing with CSS selectors

**Key Challenges**:
- Finding correct CSS selectors for data fields
- Handling missing or malformed data
- Converting price strings to numeric values
- Parsing star ratings from CSS classes

### Boilerplate Code

```python
import requests
from bs4 import BeautifulSoup
import csv

def fetch_page(url):
    """
    Fetch HTML content from URL.
    
    TODO: Implement HTTP GET request with proper headers
    TODO: Handle request errors (timeout, connection errors)
    TODO: Return response text or None on failure
    """
    pass

def parse_book_data(soup):
    """
    Extract book data from BeautifulSoup object.
    
    TODO: Find all book containers (inspect HTML structure)
    TODO: For each book, extract: title, price, availability, rating, url
    TODO: Return list of dictionaries with book data
    """
    pass

def clean_price(price_str):
    """
    Convert price string (e.g., "£51.77") to float.
    
    TODO: Remove currency symbol
    TODO: Convert to float
    TODO: Handle invalid formats
    """
    pass

def parse_rating(rating_class):
    """
    Convert rating class (e.g., "star-rating Three") to integer.
    
    TODO: Extract rating word (One, Two, Three, Four, Five)
    TODO: Map to integer (1-5)
    TODO: Handle missing ratings
    """
    pass

def save_to_csv(books, filename):
    """
    Write book data to CSV file.
    
    TODO: Open file for writing
    TODO: Create CSV writer with proper headers
    TODO: Write all book rows
    """
    pass

def main():
    """
    Main execution flow.
    
    TODO: Define target URL
    TODO: Fetch page content
    TODO: Parse HTML with BeautifulSoup
    TODO: Extract book data
    TODO: Save to CSV
    TODO: Print summary (number of books extracted)
    """
    pass

if __name__ == "__main__":
    main()
```

### Progressive Hints

**Hint 1 (CSS Selectors)**:
- Book containers: Look for `<article>` tags with class `product_pod`
- Title: Inside `<h3>` tag, within `<a>` tag
- Price: Look for class `price_color`
- Availability: Look for class `availability`
- Rating: Look for class starting with `star-rating`

**Hint 2 (Data Cleaning)**:
- Price: Use `replace('£', '')` then `float()`
- Rating: Split class string and map words to numbers
- URL: Combine base URL with relative path from `<a href>`

**Hint 3 (Error Handling)**:
- Use try-except blocks for requests
- Check if elements exist before accessing
- Provide default values for missing data

### Resources

**Official Documentation**:
- requests: https://requests.readthedocs.io/
- BeautifulSoup: https://www.crummy.com/software/BeautifulSoup/bs4/doc/

**GitHub Repositories**:
- requests: https://github.com/psf/requests (52k+ stars)
- BeautifulSoup: https://www.crummy.com/software/BeautifulSoup/ (Official site)

---

## Project 2: Pagination Handling

### Overview

**Title**: Multi-Page Product Scraper  
**Primary Tools**: requests, BeautifulSoup  
**Learning Objective**: Navigate and scrape multiple pages programmatically  
**Duration**: 6-8 hours

### Target Website

**URL**: `https://books.toscrape.com/catalogue/page-1.html`  
**Type**: Static HTML with pagination  
**Pages**: 50 pages total

### Success Criteria

Extract book data from **all 50 pages** and output CSV with:
- Same columns as Project 1
- Minimum 1000 books extracted
- Proper rate limiting (1 second between requests)

### Architectural Guidance

**High-Level Approach**:
1. Start with page 1
2. Extract book data (reuse Project 1 logic)
3. Find "next page" link
4. Navigate to next page
5. Repeat until no more pages
6. Implement rate limiting between requests

**Key Challenges**:
- Detecting last page (no "next" link)
- Constructing correct URLs for each page
- Implementing rate limiting without blocking
- Handling network errors gracefully

### Boilerplate Code

```python
import requests
from bs4 import BeautifulSoup
import csv
import time

# Reuse functions from Project 1: fetch_page, parse_book_data, clean_price, parse_rating, save_to_csv

def get_next_page_url(soup, current_url):
    """
    Find URL of next page.
    
    TODO: Locate "next" button/link in pagination
    TODO: Extract href attribute
    TODO: Construct full URL (handle relative paths)
    TODO: Return None if no next page exists
    """
    pass

def scrape_all_pages(start_url, delay=1.0):
    """
    Scrape all pages starting from start_url.
    
    TODO: Initialize empty list for all books
    TODO: Set current_url to start_url
    TODO: Loop while current_url is not None:
    TODO:   - Fetch page
    TODO:   - Parse books
    TODO:   - Add to all_books list
    TODO:   - Get next page URL
    TODO:   - Sleep for delay seconds (rate limiting)
    TODO: Return all_books
    """
    pass

def main():
    """
    Main execution flow.
    
    TODO: Define start URL
    TODO: Scrape all pages with rate limiting
    TODO: Save to CSV
    TODO: Print summary (total books, total pages)
    """
    pass

if __name__ == "__main__":
    main()
```

### Progressive Hints

**Hint 1 (Pagination)**:
- Look for `<li class="next">` element
- Extract `<a href>` from within
- Combine with base URL if href is relative

**Hint 2 (Rate Limiting)**:
- Use `time.sleep(1)` between requests
- Consider exponential backoff for errors

**Hint 3 (Loop Termination)**:
- Check if "next" element exists
- Return None when not found
- Break loop when get_next_page_url returns None

---

## Project 3: Dynamic Content Scraping (Yellow Pages)

### Overview

**Title**: Yellow Pages Business Directory Scraper  
**Primary Tools**: Playwright or Selenium  
**Learning Objective**: Scrape JavaScript-rendered dynamic content  
**Duration**: 10-12 hours

### Target Website

**URL**: `https://yellowpages.com.eg/ar/search/%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9-%D9%85%D9%86%D8%B8%D9%81%D8%A7%D8%AA/213`  
**Type**: Dynamic content loaded via JavaScript  
**Language**: Arabic (Cairo cleaning services)

### Success Criteria

Extract business data and output CSV with:
- `business_name` (string, Arabic)
- `phone` (string)
- `address` (string, Arabic)
- `category` (string)
- `page_number` (integer)

**Minimum**: 50 businesses across multiple pages  
**Format**: `yellowpages.csv` with UTF-8 encoding

### Architectural Guidance

**High-Level Approach**:
1. Launch headless browser (Playwright/Selenium)
2. Navigate to target URL
3. Wait for JavaScript to load content
4. Extract business listings
5. Handle pagination (click "next" button)
6. Close browser gracefully

**Why These Tools?**:
- `Playwright`: Modern, fast, reliable browser automation
- `Selenium`: Mature, widely-used alternative
- Both execute JavaScript and wait for dynamic content

**Key Challenges**:
- Waiting for dynamic content to load
- Handling Arabic text encoding (UTF-8)
- Clicking pagination buttons programmatically
- Managing browser lifecycle

### Boilerplate Code (Playwright)

```python
from playwright.sync_api import sync_playwright
import csv
import time

def scrape_page(page):
    """
    Extract business data from current page.
    
    TODO: Wait for business listings to load
    TODO: Find all business containers
    TODO: For each business, extract: name, phone, address, category
    TODO: Return list of dictionaries
    """
    pass

def click_next_page(page):
    """
    Click next page button if it exists.
    
    TODO: Find "next" button element
    TODO: Check if button is enabled/clickable
    TODO: Click button
    TODO: Wait for new content to load
    TODO: Return True if successful, False if no more pages
    """
    pass

def scrape_yellowpages(url, max_pages=5):
    """
    Scrape multiple pages from Yellow Pages.
    
    TODO: Launch Playwright browser (headless=True)
    TODO: Create new page
    TODO: Navigate to URL
    TODO: Loop for max_pages:
    TODO:   - Scrape current page
    TODO:   - Add page_number to each business
    TODO:   - Try to click next page
    TODO:   - Break if no more pages
    TODO:   - Sleep for rate limiting
    TODO: Close browser
    TODO: Return all businesses
    """
    pass

def save_to_csv_utf8(businesses, filename):
    """
    Save data to CSV with UTF-8 encoding.
    
    TODO: Open file with encoding='utf-8'
    TODO: Write CSV with proper headers
    TODO: Handle Arabic text correctly
    """
    pass

def main():
    """
    Main execution flow.
    
    TODO: Define target URL
    TODO: Scrape Yellow Pages
    TODO: Save to CSV with UTF-8
    TODO: Print summary
    """
    pass

if __name__ == "__main__":
    main()
```

### Progressive Hints

**Hint 1 (Waiting for Content)**:
- Use `page.wait_for_selector()` to wait for elements
- Common selector: `div.listing` or similar
- Wait for network idle: `page.wait_for_load_state('networkidle')`

**Hint 2 (Arabic Text)**:
- Always use `encoding='utf-8'` when writing files
- Test with `print()` to verify encoding works
- Use `newline=''` in CSV writer for proper line endings

**Hint 3 (Pagination)**:
- Look for button with text "التالي" (next in Arabic)
- Check if button has `disabled` attribute
- Use `page.click()` with selector

### Resources

**Official Documentation**:
- Playwright: https://playwright.dev/python/
- Selenium: https://selenium-python.readthedocs.io/

**GitHub Repositories**:
- Playwright: https://github.com/microsoft/playwright-python (11k+ stars)
- Selenium: https://github.com/SeleniumHQ/selenium (30k+ stars)

---

## Project 4: Session Management

### Overview

**Title**: Authenticated Content Scraper  
**Primary Tools**: requests, sessions  
**Learning Objective**: Handle cookies, sessions, and stateful scraping  
**Duration**: 6-8 hours

### Target Website

**URL**: `http://quotes.toscrape.com/login` (practice site with login)  
**Type**: Static HTML with session management

### Success Criteria

1. Successfully log in to the website
2. Extract quotes from authenticated pages
3. Output CSV with:
   - `quote_text` (string)
   - `author` (string)
   - `tags` (string, comma-separated)

**Minimum**: 50 quotes extracted from authenticated pages

### Architectural Guidance

**High-Level Approach**:
1. Create requests Session object
2. Fetch login page to get CSRF token
3. Submit login form with credentials
4. Use same session to access protected pages
5. Extract quotes from authenticated pages
6. Session maintains cookies automatically

**Key Challenges**:
- Extracting CSRF tokens from forms
- Submitting POST requests with form data
- Maintaining session across requests
- Handling login failures

### Boilerplate Code

```python
import requests
from bs4 import BeautifulSoup
import csv

def create_session():
    """
    Create and return requests Session object.
    
    TODO: Initialize requests.Session()
    TODO: Set user-agent header
    TODO: Return session
    """
    pass

def login(session, login_url, username, password):
    """
    Log in to website and maintain session.
    
    TODO: Fetch login page
    TODO: Parse HTML to find CSRF token (if required)
    TODO: Prepare form data (username, password, csrf_token)
    TODO: Submit POST request to login URL
    TODO: Check if login successful (status code, redirect, etc.)
    TODO: Return True if successful, False otherwise
    """
    pass

def scrape_quotes(session, url):
    """
    Scrape quotes from authenticated page.
    
    TODO: Use session.get() to fetch page (maintains cookies)
    TODO: Parse HTML with BeautifulSoup
    TODO: Extract quotes, authors, tags
    TODO: Return list of dictionaries
    """
    pass

def main():
    """
    Main execution flow.
    
    TODO: Create session
    TODO: Log in with credentials
    TODO: If login successful, scrape quotes
    TODO: Save to CSV
    TODO: Print summary
    """
    pass

if __name__ == "__main__":
    main()
```

### Progressive Hints

**Hint 1 (CSRF Token)**:
- Look for hidden input field with name `csrf_token`
- Extract value attribute: `soup.find('input', {'name': 'csrf_token'})['value']`

**Hint 2 (Login POST)**:
- Form data: `{'username': username, 'password': password, 'csrf_token': token}`
- Use `session.post(login_url, data=form_data)`
- Check response URL or status to verify login

**Hint 3 (Session Persistence)**:
- Session object automatically handles cookies
- Use same session for all subsequent requests
- No need to manually manage cookies

---

## Project 5: Scalable Web Crawling

### Overview

**Title**: Multi-Domain Web Crawler  
**Primary Tools**: Scrapy  
**Learning Objective**: Build scalable, production-ready web crawlers  
**Duration**: 12-15 hours

### Target Website

**URL**: `https://books.toscrape.com/` (start URL)  
**Type**: Multi-page site with internal links  
**Scope**: Crawl all book categories

### Success Criteria

1. Crawl all book categories (20+ categories)
2. Extract books from each category
3. Output JSON Lines file with:
   - `title`, `price`, `availability`, `rating`, `category`, `url`
4. Implement proper rate limiting (1 request/second)
5. Handle errors gracefully (retry logic)

**Minimum**: 500 books across multiple categories

### Architectural Guidance

**High-Level Approach**:
1. Create Scrapy project and spider
2. Define start URLs
3. Parse category pages to find book links
4. Follow links to book detail pages
5. Extract structured data
6. Scrapy handles: queuing, rate limiting, retries, concurrency

**Why Scrapy?**:
- Built-in request scheduling and queuing
- Automatic rate limiting and politeness
- Robust error handling and retries
- Scalable to thousands of pages
- Production-ready framework

**Key Challenges**:
- Understanding Scrapy architecture (spiders, items, pipelines)
- Following links correctly (relative vs absolute URLs)
- Structuring data with Scrapy Items
- Configuring settings (rate limit, user agent, etc.)

### Boilerplate Code

```python
# books_spider.py
import scrapy

class BooksSpider(scrapy.Spider):
    name = 'books'
    allowed_domains = ['books.toscrape.com']
    start_urls = ['https://books.toscrape.com/']
    
    # Configure rate limiting
    custom_settings = {
        'DOWNLOAD_DELAY': 1,  # 1 second between requests
        'CONCURRENT_REQUESTS': 1,
        'USER_AGENT': 'Mozilla/5.0 (Educational Scraper)'
    }
    
    def parse(self, response):
        """
        Parse homepage and category pages.
        
        TODO: Extract links to book detail pages
        TODO: Follow links using response.follow()
        TODO: Extract links to category pages
        TODO: Follow category links recursively
        """
        pass
    
    def parse_book(self, response):
        """
        Parse individual book page.
        
        TODO: Extract: title, price, availability, rating, category
        TODO: Yield dictionary with book data
        """
        pass
```

```python
# items.py
import scrapy

class BookItem(scrapy.Item):
    """
    Define structure for book data.
    
    TODO: Define fields: title, price, availability, rating, category, url
    """
    pass
```

```python
# settings.py
# TODO: Configure Scrapy settings
# - Set ROBOTSTXT_OBEY = True
# - Set DOWNLOAD_DELAY = 1
# - Set CONCURRENT_REQUESTS = 1
# - Set USER_AGENT
# - Configure FEEDS for JSON Lines output
```

### Progressive Hints

**Hint 1 (Following Links)**:
- Use `response.css('a::attr(href)').getall()` to get all links
- Use `response.follow(url, callback=self.parse_book)` to follow links
- Scrapy handles absolute/relative URL conversion

**Hint 2 (Extracting Data)**:
- CSS selectors: `response.css('h1::text').get()`
- XPath: `response.xpath('//h1/text()').get()`
- Multiple elements: `.getall()` instead of `.get()`

**Hint 3 (Running Spider)**:
- Command: `scrapy crawl books -o books.jsonl`
- Output format: JSON Lines (one JSON object per line)
- Check `scrapy.cfg` for project configuration

### Resources

**Official Documentation**:
- Scrapy: https://docs.scrapy.org/

**GitHub Repository**:
- Scrapy: https://github.com/scrapy/scrapy (52k+ stars)

**Tutorials**:
- Scrapy Tutorial: https://docs.scrapy.org/en/latest/intro/tutorial.html

---

## Completion and Certification

### Specialization Badge

Upon completing all 5 projects with verified success criteria, learners earn the **Web Scraping Specialist** badge.

**Badge Criteria**:
- ✅ All 5 projects completed with measurable success criteria met
- ✅ Code demonstrates ethical scraping practices
- ✅ Proper error handling and rate limiting implemented
- ✅ Clean, well-structured code with comments

### Portfolio Integration

All projects can be added to learner portfolios:
- GitHub repository with README documentation
- Deployed scrapers (if applicable)
- Sample output data (CSV/JSON)
- Documentation of ethical considerations

### Next Steps

After completing this specialization:
- **Module 4 (Agentic Workflows)**: Build agents that use web scraping tools
- **Data Visualization Specialization**: Visualize scraped data
- **MLOps Specialization**: Build ML pipelines with scraped data
- **Cloud Deployment Specialization**: Deploy scrapers to cloud platforms

---

## Instructor Notes

### Assessment Rubric

**For each project, evaluate**:
1. **Functionality** (40%): Does it meet success criteria?
2. **Code Quality** (20%): Clean, readable, well-structured?
3. **Error Handling** (15%): Graceful handling of edge cases?
4. **Ethical Practices** (15%): Rate limiting, robots.txt compliance?
5. **Documentation** (10%): Clear comments and README?

### Common Pitfalls

1. **Not checking robots.txt**: Emphasize ethical scraping from day one
2. **No rate limiting**: Causes server overload and IP bans
3. **Hardcoded selectors**: Teach robust selector strategies
4. **Ignoring errors**: Emphasize try-except and validation
5. **Poor data cleaning**: Teach data validation and transformation

### Extension Ideas

**For advanced learners**:
- Add proxy rotation for large-scale scraping
- Implement distributed scraping with Scrapy Cloud
- Build scraping APIs with FastAPI
- Add data validation with Pydantic
- Implement scraping monitoring and alerting

---

**Questions or Issues?**

Contact the curriculum team or post in the Web Scraping Specialization forum.
