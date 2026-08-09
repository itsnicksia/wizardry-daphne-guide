#!/usr/bin/env python3
"""
Extract Full Alteration Stone blessing value data from wizardry.info source HTML.
This script parses the official rates page and outputs TypeScript constants.

Source: https://wizardry.info/daphne/gacha_rates/ja/alternations.html

Data Structure:
- Stone types: Lesser (下級全変造石), Full (全変造石)
- Equipment ranks: 1-5 (Worn-Ebonsteel), 6 Two-Handed, 6 Other
- Qualities: ★1-5
- Stats: 9 percentage + 9 fixed (18 total, no flat ASPD in alteration tables)

Note: The alteration stone tables do NOT include flat ASPD (行動速度上昇（固定）).
Only 会心上昇（固定）(SUR/critical) is included as the 18th stat.
"""

import re
import sys
import json
from pathlib import Path

# Map Japanese stat names to English
JP_TO_EN_STATS = {
    '攻撃力上昇（％）': 'ATK%',
    '魔力上昇（％）': 'MAG%',
    '神力上昇（％）': 'DIV%',
    '命中上昇（％）': 'ACC%',
    '回避上昇（％）': 'EVA%',
    '抵抗上昇（％）': 'RES%',
    '防御力上昇（％）': 'DEF%',
    '魔術防御力上昇（％）': 'MDEF%',
    '行動速度上昇（％）': 'ASPD%',
    '攻撃力上昇（固定）': 'ATK',
    '魔力上昇（固定）': 'MAG',
    '神力上昇（固定）': 'DIV',
    '命中上昇（固定）': 'ACC',
    '回避上昇（固定）': 'EVA',
    '抵抗上昇（固定）': 'RES',
    '防御力上昇（固定）': 'DEF',
    '魔術防御力上昇（固定）': 'MDEF',
    '会心上昇（固定）': 'SUR',
}

# Stat order for output (matching component order minus non-existent ASPD flat)
STAT_ORDER = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'SUR',
]


def find_section_indices(html_content: str) -> dict:
    """Find indices of different sections in the HTML"""
    sections = {}

    # Lesser stone section
    lesser_idx = html_content.find('下級全変造石使用時 「追加護の値」提供割合')
    sections['lesser'] = lesser_idx

    # Full stone section (not preceded by 下級)
    search_start = 0
    while True:
        idx = html_content.find('全変造石使用時 「追加護の値」提供割合', search_start)
        if idx == -1:
            break
        if idx > 2 and html_content[idx-2:idx] != '下級':
            sections['full'] = idx
            break
        search_start = idx + 1

    return sections


def find_rank_section(html_content: str, start_idx: int, rank_pattern: str) -> int:
    """Find equipment rank section within a stone type section"""
    chunk = html_content[start_idx:start_idx + 800000]
    idx = chunk.find(rank_pattern)
    if idx != -1:
        return start_idx + idx
    return -1


def extract_table_data(html_content: str, section_start: int) -> dict:
    """Extract all data from a table at the given section"""
    chunk = html_content[section_start:section_start + 200000]

    # Find the table
    table_match = re.search(r'<table>(.*?)</table>', chunk, re.DOTALL)
    if not table_match:
        return {}

    table = table_match.group(1)

    # Get header values (column numbers)
    header_match = re.search(r'<thead>(.*?)</thead>', table, re.DOTALL)
    if not header_match:
        return {}

    header = header_match.group(1)
    value_cols = [int(v) for v in re.findall(r'<th>(\d+)</th>', header)]

    if not value_cols:
        return {}

    # Get tbody
    tbody_match = re.search(r'<tbody>(.*?)</tbody>', table, re.DOTALL)
    if not tbody_match:
        return {}

    tbody = tbody_match.group(1)

    # Parse rows
    rows = re.split(r'<tr[^>]*>', tbody)

    data = {}
    current_quality = 0

    for row in rows:
        if not row.strip():
            continue

        # Check for quality indicator
        q_match = re.search(r'rowspan="\d+"[^>]*>(\d+)</td>', row)
        if q_match:
            current_quality = int(q_match.group(1))
            if current_quality not in data:
                data[current_quality] = {}

        if current_quality == 0:
            continue

        # Get stat name
        stat_match = re.search(r'<td class="noWrap">([^<]+)</td>', row)
        if not stat_match:
            continue

        stat_jp = stat_match.group(1)
        stat_en = JP_TO_EN_STATS.get(stat_jp)
        if not stat_en:
            continue

        # Get probabilities
        probs = []
        for p_str in re.findall(r'<td class="textAlignRight[^"]*">([^<]+)</td>', row):
            p_str = p_str.strip()
            if p_str == '-':
                probs.append(0.0)
            else:
                probs.append(float(p_str.replace('%', '')))

        if not probs:
            continue

        # Find range of non-zero values
        start_idx = None
        end_idx = None
        prob_val = None

        for i, p in enumerate(probs):
            if p > 0:
                if start_idx is None:
                    start_idx = i
                    prob_val = p
                end_idx = i

        if start_idx is not None:
            start_val = value_cols[start_idx]
            end_val = value_cols[end_idx]
            count = end_val - start_val + 1

            data[current_quality][stat_en] = {
                'start': start_val,
                'count': count,
                'probability': prob_val
            }

    return data


def format_typescript_constant(name: str, data: dict) -> str:
    """Format data as TypeScript constant"""
    lines = [f"const {name}: MagnitudeData = {{"]

    for quality in [1, 2, 3, 4, 5]:
        if quality not in data:
            continue

        lines.append(f"    {quality}: {{")

        for stat in STAT_ORDER:
            if stat not in data[quality]:
                continue

            d = data[quality][stat]
            prob_str = f"{d['probability']:.4f}".rstrip('0').rstrip('.')
            lines.append(f"        '{stat}': {{ start: {d['start']}, count: {d['count']}, probability: {prob_str} }},")

        lines.append("    },")

    lines.append("};")
    return '\n'.join(lines)


def main():
    # Try to read from /tmp first, then download if needed
    html_path = Path('/tmp/alternations.html')

    if not html_path.exists():
        print("Downloading source HTML...")
        import urllib.request
        url = 'https://wizardry.info/daphne/gacha_rates/ja/alternations.html'
        urllib.request.urlretrieve(url, html_path)

    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    print(f"Loaded {len(html_content):,} bytes from {html_path}")

    # Find sections
    sections = find_section_indices(html_content)
    print(f"\nSection indices: {sections}")

    # Define rank patterns
    rank_patterns = {
        'rank1to5': '装備ランク1～5',
        'rank6TwoHanded': '装備ランク6（両手剣、両手槍、両手斧、両手鈍器、）',
        'rank6Other': '装備ランク6（上記武器以外）',
    }

    all_data = {}

    for stone_type, stone_idx in sections.items():
        if stone_idx == -1:
            print(f"WARNING: {stone_type} section not found!")
            continue

        all_data[stone_type] = {}

        for rank_key, rank_pattern in rank_patterns.items():
            rank_idx = find_rank_section(html_content, stone_idx, rank_pattern)
            if rank_idx == -1:
                print(f"WARNING: {stone_type} {rank_key} section not found!")
                continue

            data = extract_table_data(html_content, rank_idx)
            all_data[stone_type][rank_key] = data
            print(f"Extracted {stone_type} {rank_key}: {len(data)} qualities")

    # Output as TypeScript
    print("\n" + "=" * 60)
    print("TYPESCRIPT OUTPUT")
    print("=" * 60 + "\n")

    for stone_type in ['lesser', 'full']:
        stone_name = stone_type.upper()
        for rank_key in ['rank1to5', 'rank6TwoHanded', 'rank6Other']:
            rank_name = rank_key.upper().replace('RANK', 'RANK_').replace('TWOHANDED', 'TWO_HANDED')
            const_name = f"{stone_name}_{rank_name}"

            if stone_type in all_data and rank_key in all_data[stone_type]:
                print(format_typescript_constant(const_name, all_data[stone_type][rank_key]))
                print()

    # Also output as JSON for testing
    json_output = Path('/tmp/alteration-stone-data.json')
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2)
    print(f"\nJSON data written to {json_output}")


if __name__ == '__main__':
    main()
