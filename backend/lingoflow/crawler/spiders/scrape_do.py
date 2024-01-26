import scrapy
from bs4 import BeautifulSoup

from crawler.items import PostItrms

class ScrapeDoSpider(scrapy.Spider):
    name = "scrape_do"
    # allowed_domains = ["scrape.do"]
    start_urls = ["https://scrape.do/blog/"]

    def parse(self, response):
        posts_html_block = response.css('#blog-listing > div > div:nth-child(5)')
        post_all_url: list = posts_html_block.css('a.blog-card').xpath('@href').getall()

        for post_url in post_all_url:
            yield response.follow(post_url, callback=self.parse_post)
        next_page = response.css('a.page-link[aria-label="Next"]::attr(href)').get()

        if next_page is not None:
            yield response.follow(next_page, callback=self.parse)

    def parse_post(self, response):
        post_data = {
            'url': response.url,
            'title': response.css('title::text').get(),
            'description': response.css('meta[name="description"]::attr(content)').get(),
            'h1': response.css('h1.title::text').get(),
            'content': self.clean_html(response.css('div.md-content').get()),
        }

        yield PostItrms(post_data)

    def clean_html(self, html) -> str | None:
        if html:
            soup = BeautifulSoup(html, 'html.parser')
            return soup.get_text(separator=' ', strip=True)
        else:
            return None
