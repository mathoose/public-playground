"""Batch geocoding stub — plug in Nominatim or Philly open data."""

from __future__ import annotations

from philly_venue_map.models import Venue


def geocode_venue(venue: Venue) -> Venue:
    """Return venue with lat/lon filled when geocoding is implemented."""
    return venue
