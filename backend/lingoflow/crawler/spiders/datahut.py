import scrapy


class DatahutSpider(scrapy.Spider):
    name = "datahut"
    allowed_domains = ["datahut.co"]
    start_urls = ["https://www.blog.datahut.co/"]

    def parse(self, response):
        pass
