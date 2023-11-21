import scrapy


class ZenscrapeSpider(scrapy.Spider):
    name = "zenscrape"
    allowed_domains = ["zenscrape.com"]
    start_urls = ["https://zenscrape.com/blog/"]

    def parse(self, response):
        pass
