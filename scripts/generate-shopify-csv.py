#!/usr/bin/env python3
"""
Generate a Shopify-compatible CSV for importing print products.

For each map, calculates the correct print dimensions based on
the map's aspect ratio and target frame sizes (based on longest edge).

Usage:
  python3 scripts/generate-shopify-csv.py > shopify-import.csv
"""

import csv
import sys
import math

# Maps to create products for (id, city, state, year, aspectRatio, image_url)
# Batch 2: 40 curated favorites (excluding 7 already in Shopify)
MAPS = [
    # Florida
    {"id": "jacksonville-florida-1913", "city": "Jacksonville", "state": "Florida", "year": 1913, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Florida/jacksonville-florida-1913.jpg"},
    {"id": "miami-florida-1921", "city": "Miami", "state": "Florida", "year": 1921, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Florida/miami-florida-1921.jpg"},
    {"id": "tampa-florida-1915", "city": "Tampa", "state": "Florida", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Florida/tampa-florida-1915.jpg"},
    # Georgia
    {"id": "atlanta-georgia-1899", "city": "Atlanta", "state": "Georgia", "year": 1899, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Georgia/atlanta-georgia-1899.jpg"},
    # Connecticut
    {"id": "hartford-connecticut-1922", "city": "Hartford", "state": "Connecticut", "year": 1922, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Connecticut/hartford-connecticut-1922.jpg"},
    # Indiana
    {"id": "indianapolis-indiana-1898", "city": "Indianapolis", "state": "Indiana", "year": 1898, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/indianapolis-indiana-1898.jpg"},
    {"id": "fort-wayne-indiana-1902", "city": "Fort Wayne", "state": "Indiana", "year": 1902, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/fort-wayne-indiana-1902.jpg"},
    # Iowa
    {"id": "des-moines-iowa-1901", "city": "Des Moines", "state": "Iowa", "year": 1901, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/des-moines-iowa-1901.jpg"},
    # Kansas
    {"id": "wichita-kansas-1914", "city": "Wichita", "state": "Kansas", "year": 1914, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kansas/wichita-kansas-1914.jpg"},
    # Kentucky
    {"id": "louisville-kentucky-1892", "city": "Louisville", "state": "Kentucky", "year": 1892, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/louisville-kentucky-1892.jpg"},
    # Louisiana
    {"id": "new-orleans-louisiana-1896", "city": "New Orleans", "state": "Louisiana", "year": 1896, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Louisiana/new-orleans-louisiana-1896.jpg"},
    # Maine
    {"id": "portland-maine-1896", "city": "Portland", "state": "Maine", "year": 1896, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Maine/portland-maine-1896.jpg"},
    # Maryland
    {"id": "baltimore-maryland-1901", "city": "Baltimore", "state": "Maryland", "year": 1901, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Maryland/baltimore-maryland-1901.jpg"},
    # Michigan
    {"id": "grand-rapids-michigan-1895", "city": "Grand Rapids", "state": "Michigan", "year": 1895, "aspectRatio": 0.827, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Michigan/grand-rapids-michigan-1895.jpg"},
    # Minnesota
    {"id": "saint-paul-minnesota-1903", "city": "Saint Paul", "state": "Minnesota", "year": 1903, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Minnesota/saint-paul-minnesota-1903.jpg"},
    # Montana
    {"id": "butte-montana-1900", "city": "Butte", "state": "Montana", "year": 1900, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Montana/butte-montana-1900.jpg"},
    {"id": "missoula-montana-1921", "city": "Missoula", "state": "Montana", "year": 1921, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Montana/missoula-montana-1921.jpg"},
    # Nebraska
    {"id": "omaha-nebraska-1901", "city": "Omaha", "state": "Nebraska", "year": 1901, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Nebraska/omaha-nebraska-1901.jpg"},
    # New Jersey
    {"id": "newark-new-jersey-1908", "city": "Newark", "state": "New Jersey", "year": 1908, "aspectRatio": 0.686, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20Jersey/newark-new-jersey-1908.jpg"},
    {"id": "camden-new-jersey-1906", "city": "Camden", "state": "New Jersey", "year": 1906, "aspectRatio": 0.850, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20Jersey/camden-new-jersey-1906.jpg"},
    # New York
    {"id": "buffalo-new-york-1889", "city": "Buffalo", "state": "New York", "year": 1889, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20York/buffalo-new-york-1889.jpg"},
    {"id": "brooklyn-new-york-1908", "city": "Brooklyn", "state": "New York", "year": 1908, "aspectRatio": 0.695, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20York/brooklyn-new-york-1908.jpg"},
    # North Carolina
    {"id": "raleigh-north-carolina-1914", "city": "Raleigh", "state": "North Carolina", "year": 1914, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_North%20Carolina/raleigh-north-carolina-1914.jpg"},
    # Ohio
    {"id": "cincinnati-ohio-1904", "city": "Cincinnati", "state": "Ohio", "year": 1904, "aspectRatio": 0.833, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/cincinnati-ohio-1904.jpg"},
    {"id": "cleveland-ohio-1896", "city": "Cleveland", "state": "Ohio", "year": 1896, "aspectRatio": 0.823, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/cleveland-ohio-1896.jpg"},
    {"id": "toledo-ohio-1905", "city": "Toledo", "state": "Ohio", "year": 1905, "aspectRatio": 0.831, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/toledo-ohio-1905.jpg"},
    # Oklahoma
    {"id": "tulsa-oklahoma-1915", "city": "Tulsa", "state": "Oklahoma", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Oklahoma/tulsa-oklahoma-1915.jpg"},
    # Oregon
    {"id": "astoria-oregon-1908", "city": "Astoria", "state": "Oregon", "year": 1908, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Oregon/astoria-oregon-1908.jpg"},
    # Pennsylvania
    {"id": "pottsville-pennsylvania-1885", "city": "Pottsville", "state": "Pennsylvania", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/pottsville-pennsylvania-1885.jpg"},
    # South Carolina
    {"id": "charleston-south-carolina-1902", "city": "Charleston", "state": "South Carolina", "year": 1902, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_South%20Carolina/charleston-south-carolina-1902.jpg"},
    # Texas
    {"id": "houston-texas-1896", "city": "Houston", "state": "Texas", "year": 1896, "aspectRatio": 0.841, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/houston-texas-1896.jpg"},
    {"id": "san-antonio-texas-1896", "city": "San Antonio", "state": "Texas", "year": 1896, "aspectRatio": 0.842, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/san-antonio-texas-1896.jpg"},
    {"id": "el-paso-texas-1908", "city": "El Paso", "state": "Texas", "year": 1908, "aspectRatio": 0.833, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/el-paso-texas-1908.jpg"},
    {"id": "galveston-texas-1899", "city": "Galveston", "state": "Texas", "year": 1899, "aspectRatio": 0.838, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/galveston-texas-1899.jpg"},
    {"id": "dallas-texas-1892", "city": "Dallas", "state": "Texas", "year": 1892, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/dallas-texas-1892.jpg"},
    # Virginia
    {"id": "norfolk-virginia-1898", "city": "Norfolk", "state": "Virginia", "year": 1898, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Virginia/norfolk-virginia-1898.jpg"},
    {"id": "roanoke-virginia-1907", "city": "Roanoke", "state": "Virginia", "year": 1907, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Virginia/roanoke-virginia-1907.jpg"},
    # Idaho
    {"id": "boise-idaho-1912", "city": "Boise", "state": "Idaho", "year": 1912, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Idaho/boise-idaho-1912.jpg"},
    # Illinois
    {"id": "decatur-illinois-1915", "city": "Decatur", "state": "Illinois", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Illinois/decatur-illinois-1915.jpg"},
    # Wisconsin
    {"id": "oshkosh-wisconsin-1903", "city": "Oshkosh", "state": "Wisconsin", "year": 1903, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Wisconsin/oshkosh-wisconsin-1903.jpg"},
]

# Target longest edge (height) for each size tier, in inches
SIZE_TIERS = [
    {"name": "Small", "longest_edge": 12, "price": "139.00"},
    {"name": "Medium", "longest_edge": 18, "price": "299.00"},
    {"name": "Large", "longest_edge": 24, "price": "465.00"},
]


def fraction_display(value):
    """Convert a decimal to a display string with fractions (e.g., 10.125 -> 10⅛)."""
    whole = int(value)
    frac = value - whole

    # Common fractions for print dimensions
    fraction_map = {
        0: "",
        0.125: "⅛",
        0.25: "¼",
        0.375: "⅜",
        0.5: "½",
        0.625: "⅝",
        0.75: "¾",
        0.875: "⅞",
    }

    # Find closest fraction (to nearest 1/16)
    sixteenth = round(frac * 16) / 16
    # Round to nearest 1/8 for display
    eighth = round(sixteenth * 8) / 8

    if eighth >= 1.0:
        whole += 1
        eighth = 0

    frac_str = fraction_map.get(eighth, f"{frac:.2f}"[1:])  # fallback to decimal

    if whole == 0 and frac_str:
        return frac_str
    return f"{whole}{frac_str}"


def calc_dimensions(aspect_ratio, longest_edge):
    """
    Given an aspect ratio (width/height) and target longest edge (height),
    calculate the print width and return formatted dimension string.
    For these maps, height > width, so longest_edge = height.
    """
    width = longest_edge * aspect_ratio
    width_display = fraction_display(width)
    height_display = fraction_display(longest_edge)
    return f'{width_display} \u00d7 {height_display}"'


def main():
    # Shopify requires \r\n line endings - write to binary stdout
    out = open(sys.stdout.fileno(), 'w', newline='', closefd=False)
    writer = csv.writer(out, lineterminator='\r\n')

    # Shopify CSV headers
    headers = [
        "Handle",
        "Title",
        "Body (HTML)",
        "Vendor",
        "Product Category",
        "Type",
        "Tags",
        "Published",
        "Option1 Name",
        "Option1 Value",
        "Variant SKU",
        "Variant Grams",
        "Variant Inventory Tracker",
        "Variant Inventory Qty",
        "Variant Inventory Policy",
        "Variant Fulfillment Service",
        "Variant Price",
        "Variant Compare At Price",
        "Variant Requires Shipping",
        "Variant Taxable",
        "Image Src",
        "Image Position",
        "Image Alt Text",
        "Status",
    ]
    writer.writerow(headers)

    for map_data in MAPS:
        handle = f"print-{map_data['id']}"
        title = f"{map_data['city']}, {map_data['state']} ({map_data['year']})"
        body = (
            f"<p>A beautifully preserved Sanborn Fire Insurance Map from {map_data['year']}, "
            f"showcasing the architectural layout and Victorian-era typography of "
            f"{map_data['city']}, {map_data['state']}.</p>"
            f"<p>Each print is produced on archival-quality paper and custom framed with a "
            f"Gallery Natural frame and single mat.</p>"
        )
        tags = f"Vintage Map, Sanborn Map, {map_data['state']}, Framed Print"

        for i, tier in enumerate(SIZE_TIERS):
            dims = calc_dimensions(map_data["aspectRatio"], tier["longest_edge"])
            sku = f"{map_data['id']}-{tier['name'].lower()}"

            row = [
                handle,
                title if i == 0 else "",  # Title only on first variant row
                body if i == 0 else "",
                "Sanborn Fire Maps" if i == 0 else "",
                "Posters, Prints, & Visual Artwork" if i == 0 else "",
                "Framed Print" if i == 0 else "",
                tags if i == 0 else "",
                "TRUE",
                "Size",
                f"{tier['name']} ({dims})",
                sku,
                "1000",  # Weight placeholder
                "",  # No inventory tracking
                "",
                "deny",
                "manual",
                tier["price"],
                "",
                "TRUE",
                "TRUE",
                map_data["image"] if i == 0 else "",
                "1" if i == 0 else "",
                f"{map_data['city']}, {map_data['state']} - {map_data['year']} Sanborn Map"
                if i == 0
                else "",
                "active",
            ]
            writer.writerow(row)

    # Also print summary to stderr
    print("\n--- Summary ---", file=sys.stderr)
    for map_data in MAPS:
        print(f"\n{map_data['city']}, {map_data['state']} ({map_data['year']}):", file=sys.stderr)
        print(f"  Aspect ratio: {map_data['aspectRatio']}", file=sys.stderr)
        for tier in SIZE_TIERS:
            dims = calc_dimensions(map_data["aspectRatio"], tier["longest_edge"])
            print(f"  {tier['name']}: {dims} — ${tier['price']}", file=sys.stderr)


if __name__ == "__main__":
    main()
