import scrapy


class OctoparseSpider(scrapy.Spider):
    name = "octoparse"
    allowed_domains = ["octoparse.com"]
    start_urls = ["https://octoparse.com/blog/"]

    def parse(self, response):
        pass
