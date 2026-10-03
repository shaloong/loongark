from PIL import Image, ImageDraw
import json
from pathlib import Path

root = Path(__file__).resolve().parent
captures = json.loads((root / 'component-captures.json').read_text(encoding='utf-8'))
for start in range(0, len(captures), 8):
    canvas = Image.new('RGB', (1280, 4 * 385), '#e4e4e7')
    draw = ImageDraw.Draw(canvas)
    for index, item in enumerate(captures[start:start + 8]):
        image = Image.open(root / item['file']).convert('RGB')
        image.thumbnail((636, 356))
        x, y = (index % 2) * 640, (index // 2) * 385
        draw.text((x + 8, y + 5), f"{item['step']} {item['title']}", fill='black')
        canvas.paste(image, (x + 2, y + 26))
    canvas.save(root / f'contact-{start // 8 + 1}.jpg', quality=93)
