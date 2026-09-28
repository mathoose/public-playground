from datetime import datetime, timezone

from philly_venue_map.models import Venue


def test_venue_to_dict():
    v = Venue(
        name="Test Cafe",
        category="coffee",
        source_url="https://example.com",
        scraped_at=datetime(2026, 1, 1, tzinfo=timezone.utc),
    )
    d = v.to_dict()
    assert d["name"] == "Test Cafe"
    assert d["scraped_at"].startswith("2026-01-01")
