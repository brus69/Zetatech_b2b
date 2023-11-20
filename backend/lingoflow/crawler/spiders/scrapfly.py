import scrapy


class ScrapflySpider(scrapy.Spider):
    name = "scrapfly"
    allowed_domains = ["scrapfly.io"]
    start_urls = ["https://scrapfly.io/blog/"]

    def parse(self, response):
        pass
