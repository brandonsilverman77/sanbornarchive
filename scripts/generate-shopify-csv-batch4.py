#!/usr/bin/env python3
"""
Generate a Shopify-compatible CSV — Batch 4 (favorites gap-fill).

30 favorite maps with 0.843 aspect ratio not yet in Shopify.

Usage:
  python3 scripts/generate-shopify-csv-batch4.py > scripts/shopify-import-batch4.csv
"""

import csv
import sys

MAPS = [
    # Connecticut
    {"id": "bridgeport-connecticut-1913", "city": "Bridgeport", "state": "Connecticut", "year": 1913, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Connecticut/bridgeport-connecticut-1913.jpg"},
    {"id": "new-haven-connecticut-1901", "city": "New Haven", "state": "Connecticut", "year": 1901, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Connecticut/new-haven-connecticut-1901.jpg"},
    {"id": "norwalk-connecticut-1922", "city": "Norwalk", "state": "Connecticut", "year": 1922, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Connecticut/norwalk-connecticut-1922.jpg"},
    # Illinois
    {"id": "east-saint-louis-illinois-1905", "city": "East Saint Louis", "state": "Illinois", "year": 1905, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Illinois/east-saint-louis-illinois-1905.jpg"},
    # Indiana
    {"id": "elkhart-indiana-1927", "city": "Elkhart", "state": "Indiana", "year": 1927, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/elkhart-indiana-1927.jpg"},
    {"id": "evansville-indiana-1910", "city": "Evansville", "state": "Indiana", "year": 1910, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/evansville-indiana-1910.jpg"},
    {"id": "indianapolis-indiana-1915", "city": "Indianapolis", "state": "Indiana", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/indianapolis-indiana-1915.jpg"},
    {"id": "lafayette-indiana-1915", "city": "Lafayette", "state": "Indiana", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/lafayette-indiana-1915.jpg"},
    {"id": "muncie-indiana-1911", "city": "Muncie", "state": "Indiana", "year": 1911, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/muncie-indiana-1911.jpg"},
    {"id": "new-albany-indiana-1905", "city": "New Albany", "state": "Indiana", "year": 1905, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/new-albany-indiana-1905.jpg"},
    {"id": "south-bend-indiana-1899", "city": "South Bend", "state": "Indiana", "year": 1899, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/south-bend-indiana-1899.jpg"},
    {"id": "terre-haute-indiana-1892", "city": "Terre Haute", "state": "Indiana", "year": 1892, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/terre-haute-indiana-1892.jpg"},
    {"id": "terre-haute-indiana-1896", "city": "Terre Haute", "state": "Indiana", "year": 1896, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/terre-haute-indiana-1896.jpg"},
    {"id": "terre-haute-indiana-1911", "city": "Terre Haute", "state": "Indiana", "year": 1911, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/terre-haute-indiana-1911.jpg"},
    # Iowa
    {"id": "cedar-rapids-iowa-1913", "city": "Cedar Rapids", "state": "Iowa", "year": 1913, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/cedar-rapids-iowa-1913.jpg"},
    {"id": "des-moines-iowa-1891", "city": "Des Moines", "state": "Iowa", "year": 1891, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/des-moines-iowa-1891.jpg"},
    {"id": "dubuque-iowa-1891", "city": "Dubuque", "state": "Iowa", "year": 1891, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/dubuque-iowa-1891.jpg"},
    {"id": "sioux-city-iowa-1902", "city": "Sioux City", "state": "Iowa", "year": 1902, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/sioux-city-iowa-1902.jpg"},
    # Kansas
    {"id": "kansas-city-kansas-1907", "city": "Kansas City", "state": "Kansas", "year": 1907, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kansas/kansas-city-kansas-1907.jpg"},
    # Kentucky
    {"id": "louisville-kentucky-1905", "city": "Louisville", "state": "Kentucky", "year": 1905, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/louisville-kentucky-1905.jpg"},
    {"id": "newport-kentucky-1910", "city": "Newport", "state": "Kentucky", "year": 1910, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/newport-kentucky-1910.jpg"},
    {"id": "owensboro-kentucky-1910", "city": "Owensboro", "state": "Kentucky", "year": 1910, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/owensboro-kentucky-1910.jpg"},
    # Maryland
    {"id": "baltimore-maryland-1914", "city": "Baltimore", "state": "Maryland", "year": 1914, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Maryland/baltimore-maryland-1914.jpg"},
    # New Jersey
    {"id": "the-oranges-new-jersey-1895", "city": "The Oranges", "state": "New Jersey", "year": 1895, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20Jersey/the-oranges-new-jersey-1895.jpg"},
    # New York
    {"id": "owego-new-york-1888", "city": "Owego", "state": "New York", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_New%20York/owego-new-york-1888.jpg"},
    # North Carolina
    {"id": "wilmington-north-carolina-1915", "city": "Wilmington", "state": "North Carolina", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_North%20Carolina/wilmington-north-carolina-1915.jpg"},
    # Ohio
    {"id": "akron-ohio-1892", "city": "Akron", "state": "Ohio", "year": 1892, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/akron-ohio-1892.jpg"},
    {"id": "youngstown-ohio-1896", "city": "Youngstown", "state": "Ohio", "year": 1896, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/youngstown-ohio-1896.jpg"},
    # Texas
    {"id": "abilene-texas-1929", "city": "Abilene", "state": "Texas", "year": 1929, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/abilene-texas-1929.jpg"},
    {"id": "texarkana-texas-1915", "city": "Texarkana", "state": "Texas", "year": 1915, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Texas/texarkana-texas-1915.jpg"},
]

SIZE_TIERS = [
    {"name": "Small", "longest_edge": 12, "price": "139.00"},
    {"name": "Medium", "longest_edge": 18, "price": "299.00"},
    {"name": "Large", "longest_edge": 24, "price": "465.00"},
]


def fraction_display(value):
    whole = int(value)
    frac = value - whole
    fraction_map = {
        0: "", 0.125: "\u215b", 0.25: "\u00bc", 0.375: "\u215c",
        0.5: "\u00bd", 0.625: "\u215d", 0.75: "\u00be", 0.875: "\u215e",
    }
    eighth = round(round(frac * 16) / 16 * 8) / 8
    if eighth >= 1.0:
        whole += 1
        eighth = 0
    frac_str = fraction_map.get(eighth, f"{frac:.2f}"[1:])
    if whole == 0 and frac_str:
        return frac_str
    return f"{whole}{frac_str}"


def calc_dimensions(aspect_ratio, longest_edge):
    width = longest_edge * aspect_ratio
    return f'{fraction_display(width)} \u00d7 {fraction_display(longest_edge)}"'


def main():
    out = open(sys.stdout.fileno(), 'w', newline='', closefd=False)
    writer = csv.writer(out, lineterminator='\r\n')

    headers = [
        "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type",
        "Tags", "Published", "Option1 Name", "Option1 Value", "Variant SKU",
        "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty",
        "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
        "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable",
        "Image Src", "Image Position", "Image Alt Text", "Status",
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
                title if i == 0 else "", body if i == 0 else "",
                "Sanborn Fire Maps" if i == 0 else "",
                "Posters, Prints, & Visual Artwork" if i == 0 else "",
                "Framed Print" if i == 0 else "",
                tags if i == 0 else "", "TRUE", "Size",
                f"{tier['name']} ({dims})", sku, "1000", "", "", "deny", "manual",
                tier["price"], "", "TRUE", "TRUE",
                map_data["image"] if i == 0 else "",
                "1" if i == 0 else "",
                f"{map_data['city']}, {map_data['state']} - {map_data['year']} Sanborn Map" if i == 0 else "",
                "active",
            ]
            writer.writerow(row)

    print(f"\n--- Summary: {len(MAPS)} products, {len(MAPS) * 3} variants ---", file=sys.stderr)


if __name__ == "__main__":
    main()
