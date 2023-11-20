import scrapy


class ScrapeDoSpider(scrapy.Spider):
    name = "scrape_do"
    allowed_domains = ["scrape.do"]
    start_urls = ["https://scrape.do/blog/"]

    def parse(self, response):
        pass
