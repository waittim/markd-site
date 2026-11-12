# Images

Pages use these files only:

- `Markd-iOS-Default-240.png` and `Markd-iOS-Dark-240.png` for the app icon
- `screenshot-*-720.webp` and `collection-*-720.webp` are the full 1349×2760 masters, with PNG fallbacks of the same size

The `720` in the filename is historical. Pages still scale these images down with CSS.

Keep full-size masters out of this directory. GitHub Pages publishes everything here.

After replacing a 720 PNG, regenerate its WebP sibling:

```bash
python3 scripts/optimize-images.py
```
