from __future__ import annotations

import argparse


def main() -> None:
    parser = argparse.ArgumentParser(description="Philadelphia venue map tools")
    parser.add_argument("--version", action="store_true", help="Print version")
    args = parser.parse_args()
    if args.version:
        from philly_venue_map import __version__

        print(__version__)


if __name__ == "__main__":
    main()
