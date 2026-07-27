#!/usr/bin/env python3
"""Generate WebP variants for product screenshots (keeps PNG as fallback)."""
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit('Install Pillow: pip3 install pillow') from exc

ROOT = Path(__file__).resolve().parent.parent / 'assets' / 'images'
TARGETS = [
    'screenshot-light-720.png',
    'screenshot-dark-720.png',
    'collection-light-720.png',
    'collection-dark-720.png',
]

def main() -> None:
    for name in TARGETS:
        src = ROOT / name
        if not src.exists():
            print(f'skip missing {name}')
            continue
        dst = src.with_suffix('.webp')
        img = Image.open(src)
        img.save(dst, 'WEBP', quality=82, method=6)
        print(f'{name}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB')

if __name__ == '__main__':
    main()
