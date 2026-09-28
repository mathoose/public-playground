from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime
from typing import Any, Literal, Optional

VenueCategory = Literal["restaurant", "happy_hour", "coffee", "other"]


@dataclass
class Venue:
    name: str
    category: VenueCategory
    source_url: str
    scraped_at: datetime
    address: Optional[str] = None
    neighborhood: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    happy_hour_text: Optional[str] = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["scraped_at"] = self.scraped_at.isoformat()
        return data
