import scrapy
from crawler.items import PostItrms

from bs4 import BeautifulSoup

class DatamamSpider(scrapy.Spider):
    name = "datamam"
    allowed_domains = ["datamam.com"]
    start_urls = ["https://datamam.com/blog/"]
   
    def parse(self, response):
        post_links = response.css('article h3.entry-title a::attr(href)').getall()

        for post_link in post_links:
            yield scrapy.Request(post_link, callback=self.parse_post)

    def parse_post(self, response):
        post_data = {
            'title': response.css('title::text').get(),
            'description': response.css('meta[name="description"]::attr(content)').get(),
            'h1': response.css('h1.entry-title::text').get(),
            'content': self.clean_html(response.css('div.et_pb_text_inner').get()),
        }

        yield PostItrms(post_data)

    def clean_html(self, html):
        if html:
            soup = BeautifulSoup(html, 'html.parser')
            return soup.get_text(separator=' ', strip=True)
        else:
            return None