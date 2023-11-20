import scrapy


class ScrapingantSpider(scrapy.Spider):
    name = "scrapingant"
    allowed_domains = ["scrapingant.com"]
    start_urls = ["https://scrapingant.com/blog/"]

    def parse(self, response):
        pass
