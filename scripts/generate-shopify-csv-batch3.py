#!/usr/bin/env python3
"""
Generate a Shopify-compatible CSV for importing print products — Batch 3.

56 curated maps with 0.843 aspect ratio (notable US cities).

Usage:
  python3 scripts/generate-shopify-csv-batch3.py > scripts/shopify-import-batch3.csv
"""

import csv
import sys

# Batch 3: 56 curated notable cities (all 0.843 aspect ratio)
MAPS = [
    # Alabama
    {"id": "birmingham-alabama-1885", "city": "Birmingham", "state": "Alabama", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Alabama/birmingham-alabama-1885.jpg"},
    {"id": "montgomery-alabama-1884", "city": "Montgomery", "state": "Alabama", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Alabama/montgomery-alabama-1884.jpg"},
    # California
    {"id": "san-diego-california-1887", "city": "San Diego", "state": "California", "year": 1887, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_California/san-diego-california-1887.jpg"},
    # Colorado
    {"id": "colorado-springs-colorado-1890", "city": "Colorado Springs", "state": "Colorado", "year": 1890, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Colorado/colorado-springs-colorado-1890.jpg"},
    {"id": "pueblo-colorado-1883", "city": "Pueblo", "state": "Colorado", "year": 1883, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Colorado/pueblo-colorado-1883.jpg"},
    # Connecticut
    {"id": "new-haven-connecticut-1886", "city": "New Haven", "state": "Connecticut", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Connecticut/new-haven-connecticut-1886.jpg"},
    # Georgia
    {"id": "augusta-georgia-1884", "city": "Augusta", "state": "Georgia", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Georgia/augusta-georgia-1884.jpg"},
    {"id": "macon-georgia-1884", "city": "Macon", "state": "Georgia", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Georgia/macon-georgia-1884.jpg"},
    {"id": "savannah-georgia-1884", "city": "Savannah", "state": "Georgia", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Georgia/savannah-georgia-1884.jpg"},
    # Indiana
    {"id": "evansville-indiana-1884", "city": "Evansville", "state": "Indiana", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/evansville-indiana-1884.jpg"},
    {"id": "south-bend-indiana-1885", "city": "South Bend", "state": "Indiana", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/south-bend-indiana-1885.jpg"},
    {"id": "terre-haute-indiana-1886", "city": "Terre Haute", "state": "Indiana", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Indiana/terre-haute-indiana-1886.jpg"},
    # Iowa
    {"id": "cedar-rapids-iowa-1884", "city": "Cedar Rapids", "state": "Iowa", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/cedar-rapids-iowa-1884.jpg"},
    {"id": "davenport-iowa-1886", "city": "Davenport", "state": "Iowa", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/davenport-iowa-1886.jpg"},
    {"id": "sioux-city-iowa-1884", "city": "Sioux City", "state": "Iowa", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Iowa/sioux-city-iowa-1884.jpg"},
    # Kansas
    {"id": "kansas-city-kansas-1889", "city": "Kansas City", "state": "Kansas", "year": 1889, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kansas/kansas-city-kansas-1889.jpg"},
    {"id": "topeka-kansas-1883", "city": "Topeka", "state": "Kansas", "year": 1883, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kansas/topeka-kansas-1883.jpg"},
    # Kentucky
    {"id": "covington-kentucky-1886", "city": "Covington", "state": "Kentucky", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/covington-kentucky-1886.jpg"},
    {"id": "lexington-kentucky-1886", "city": "Lexington", "state": "Kentucky", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/lexington-kentucky-1886.jpg"},
    {"id": "newport-kentucky-1886", "city": "Newport", "state": "Kentucky", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Kentucky/newport-kentucky-1886.jpg"},
    # Louisiana
    {"id": "baton-rouge-louisiana-1885", "city": "Baton Rouge", "state": "Louisiana", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Louisiana/baton-rouge-louisiana-1885.jpg"},
    {"id": "shreveport-louisiana-1885", "city": "Shreveport", "state": "Louisiana", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Louisiana/shreveport-louisiana-1885.jpg"},
    # Massachusetts
    {"id": "boston-massachusetts-1867", "city": "Boston", "state": "Massachusetts", "year": 1867, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Massachusetts/boston-massachusetts-1867.jpg"},
    # Michigan
    {"id": "detroit-michigan-1889", "city": "Detroit", "state": "Michigan", "year": 1889, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Michigan/detroit-michigan-1889.jpg"},
    # Minnesota
    {"id": "duluth-minnesota-1884", "city": "Duluth", "state": "Minnesota", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Minnesota/duluth-minnesota-1884.jpg"},
    {"id": "minneapolis-minnesota-1885", "city": "Minneapolis", "state": "Minnesota", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Minnesota/minneapolis-minnesota-1885.jpg"},
    {"id": "rochester-minnesota-1884", "city": "Rochester", "state": "Minnesota", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Minnesota/rochester-minnesota-1884.jpg"},
    # Mississippi
    {"id": "jackson-mississippi-1885", "city": "Jackson", "state": "Mississippi", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Mississippi/jackson-mississippi-1885.jpg"},
    # Missouri
    {"id": "springfield-missouri-1884", "city": "Springfield", "state": "Missouri", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Missouri/springfield-missouri-1884.jpg"},
    # Nebraska
    {"id": "lincoln-nebraska-1884", "city": "Lincoln", "state": "Nebraska", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Nebraska/lincoln-nebraska-1884.jpg"},
    # North Carolina
    {"id": "wilmington-north-carolina-1884", "city": "Wilmington", "state": "North Carolina", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_North%20Carolina/wilmington-north-carolina-1884.jpg"},
    # Ohio
    {"id": "akron-ohio-1888", "city": "Akron", "state": "Ohio", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/akron-ohio-1888.jpg"},
    {"id": "canton-ohio-1887", "city": "Canton", "state": "Ohio", "year": 1887, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/canton-ohio-1887.jpg"},
    {"id": "dayton-ohio-1887", "city": "Dayton", "state": "Ohio", "year": 1887, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/dayton-ohio-1887.jpg"},
    {"id": "youngstown-ohio-1884", "city": "Youngstown", "state": "Ohio", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Ohio/youngstown-ohio-1884.jpg"},
    # Oregon
    {"id": "portland-oregon-1889", "city": "Portland", "state": "Oregon", "year": 1889, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Oregon/portland-oregon-1889.jpg"},
    # Pennsylvania
    {"id": "allentown-pennsylvania-1885", "city": "Allentown", "state": "Pennsylvania", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/allentown-pennsylvania-1885.jpg"},
    {"id": "erie-pennsylvania-1888", "city": "Erie", "state": "Pennsylvania", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/erie-pennsylvania-1888.jpg"},
    {"id": "harrisburg-pennsylvania-1884", "city": "Harrisburg", "state": "Pennsylvania", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/harrisburg-pennsylvania-1884.jpg"},
    {"id": "pittsburgh-pennsylvania-1884", "city": "Pittsburgh", "state": "Pennsylvania", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/pittsburgh-pennsylvania-1884.jpg"},
    {"id": "reading-pennsylvania-1887", "city": "Reading", "state": "Pennsylvania", "year": 1887, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/reading-pennsylvania-1887.jpg"},
    {"id": "scranton-pennsylvania-1884", "city": "Scranton", "state": "Pennsylvania", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Pennsylvania/scranton-pennsylvania-1884.jpg"},
    # South Carolina
    {"id": "charleston-south-carolina-1884", "city": "Charleston", "state": "South Carolina", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_South%20Carolina/charleston-south-carolina-1884.jpg"},
    # Tennessee
    {"id": "knoxville-tennessee-1884", "city": "Knoxville", "state": "Tennessee", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Tennessee/knoxville-tennessee-1884.jpg"},
    {"id": "memphis-tennessee-1888", "city": "Memphis", "state": "Tennessee", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Tennessee/memphis-tennessee-1888.jpg"},
    {"id": "nashville-tennessee-1888", "city": "Nashville", "state": "Tennessee", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Tennessee/nashville-tennessee-1888.jpg"},
    # Utah
    {"id": "salt-lake-city-utah-1884", "city": "Salt Lake City", "state": "Utah", "year": 1884, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Utah/salt-lake-city-utah-1884.jpg"},
    # Virginia
    {"id": "richmond-virginia-1886", "city": "Richmond", "state": "Virginia", "year": 1886, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Virginia/richmond-virginia-1886.jpg"},
    {"id": "richmond-virginia-1905", "city": "Richmond", "state": "Virginia", "year": 1905, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Virginia/richmond-virginia-1905.jpg"},
    # Washington
    {"id": "spokane-washington-1888", "city": "Spokane", "state": "Washington", "year": 1888, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Washington/spokane-washington-1888.jpg"},
    {"id": "tacoma-washington-1885", "city": "Tacoma", "state": "Washington", "year": 1885, "aspectRatio": 0.843, "image": "https://pub-23faac8a63b74289910a34142d5d1899.r2.dev/medium/_Washington/tacoma-washington-1885.jpg"},
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

    sixteenth = round(frac * 16) / 16
    eighth = round(sixteenth * 8) / 8

    if eighth >= 1.0:
        whole += 1
        eighth = 0

    frac_str = fraction_map.get(eighth, f"{frac:.2f}"[1:])

    if whole == 0 and frac_str:
        return frac_str
    return f"{whole}{frac_str}"


def calc_dimensions(aspect_ratio, longest_edge):
    width = longest_edge * aspect_ratio
    width_display = fraction_display(width)
    height_display = fraction_display(longest_edge)
    return f'{width_display} \u00d7 {height_display}"'


def main():
    out = open(sys.stdout.fileno(), 'w', newline='', closefd=False)
    writer = csv.writer(out, lineterminator='\r\n')

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
                title if i == 0 else "",
                body if i == 0 else "",
                "Sanborn Fire Maps" if i == 0 else "",
                "Posters, Prints, & Visual Artwork" if i == 0 else "",
                "Framed Print" if i == 0 else "",
                tags if i == 0 else "",
                "TRUE",
                "Size",
                f"{tier['name']} ({dims})",
                sku,
                "1000",
                "",
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

    print(f"\n--- Summary: {len(MAPS)} products, {len(MAPS) * 3} variants ---", file=sys.stderr)


if __name__ == "__main__":
    main()
