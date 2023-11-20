import scrapy


class DatamamSpider(scrapy.Spider):
    name = "datamam"
    allowed_domains = ["datamam.com"]
    start_urls = ["https://datamam.com/blog/"]

    def parse(self, response):
        pass
