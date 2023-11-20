import scrapy


class ScrapingprosSpider(scrapy.Spider):
    name = "scrapingpros"
    allowed_domains = ["scrapingpros.com"]
    start_urls = ["https://scrapingpros.com/blog/"]

    def parse(self, response):
        pass
