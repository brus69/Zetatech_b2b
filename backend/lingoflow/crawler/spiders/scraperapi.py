import scrapy


class ScraperapiSpider(scrapy.Spider):
    name = "scraperapi"
    allowed_domains = ["scraperapi.com"]
    start_urls = ["https://scraperapi.com/blog/"]

    def parse(self, response):
        pass
