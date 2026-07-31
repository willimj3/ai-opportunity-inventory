#!/usr/bin/env python3
"""Refresh data/opportunities.sample.json from an Excel export of the
Raw Opportunity Bank sheet.

Usage:
    python3 scripts/refresh_data.py            # uses newest .xlsx in repo root
    python3 scripts/refresh_data.py path.xlsx  # or a specific file

Drop a fresh "File → Download → Microsoft Excel" export of the tracker sheet
into the project folder and run this; then commit + deploy. Columns are read
positionally (A–O), matching the public-view sheet layout.
"""
import json
import sys
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "opportunities.sample.json"

FIELDS = [
    "website", "title", "summary", "submitter", "orgType", "govBranch",
    "orgLocation", "domain", "beneficiaries", "geoScope", "deploymentStage",
    "evidence", "aiModel", "barriers", "enablers",
]


def clean(value) -> str:
    if value is None:
        return ""
    return str(value).strip()


def main() -> None:
    if len(sys.argv) > 1:
        xlsx = Path(sys.argv[1])
    else:
        candidates = sorted(ROOT.glob("*.xlsx"), key=lambda p: p.stat().st_mtime, reverse=True)
        if not candidates:
            sys.exit("No .xlsx file found in the project root.")
        xlsx = candidates[0]

    wb = openpyxl.load_workbook(xlsx, data_only=True)
    sheet = wb.worksheets[0]

    rows = []
    for r, row in enumerate(sheet.iter_rows(min_row=2, max_col=len(FIELDS), values_only=True)):
        record = {field: clean(row[i]) if i < len(row) else "" for i, field in enumerate(FIELDS)}
        if not record["title"] and not record["summary"]:
            continue  # skip blank rows
        rows.append(record)

    OUT.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n")
    print(f"Read {xlsx.name} → wrote {len(rows)} entries to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
