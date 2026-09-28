# supreme-broccoli

Philadelphia venue map: restaurants, happy hours, coffee shops — scraped with [Scrapling](https://github.com/D4Vinci/Scrapling), geocoded, and exported for mapping.

## Setup

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
scrapling install
```

## Develop

```bash
pytest
philly-venue-map --help
```

## Project layout

- `src/philly_venue_map/` — models, geocoding stub, Scrapling spiders
- `schemas/venue.json` — venue record shape
- `data/` — scraped output (gitignored except `.gitkeep`)
