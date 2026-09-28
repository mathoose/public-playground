"""Example Scrapling spider — set start_urls to a allowed listing site."""

from scrapling.spiders import Response, Spider


class ExampleVenueListingSpider(Spider):
    name = "example_venue_listing"
    # start_urls = ["https://example.com/philly/restaurants"]

    async def parse(self, response: Response):
        for row in response.css(".listing"):
            yield {
                "name": row.css(".title::text").get(),
                "url": row.css("a::attr(href)").get(),
            }
