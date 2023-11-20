import scrapy


class ScrapingdogSpider(scrapy.Spider):
    name = "scrapingdog"
    allowed_domains = ["scrapingdog.com"]
    start_urls = ["https://scrapingdog.com/blog/"]

    def parse(self, response):
        pass
