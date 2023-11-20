import scrapy


class DatahutSpider(scrapy.Spider):
    name = "datahut"
    allowed_domains = ["datahut.co"]
    start_urls = ["https://datahut.co/blog/"]

    def parse(self, response):
        pass
