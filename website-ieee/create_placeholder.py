from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(output_path):
    width, height = 1920, 1080
    color = (50, 50, 50) # Dark Gray
    img = Image.new('RGB', (width, height), color)
    
    d = ImageDraw.Draw(img)
    
    # Optional: Draw some random shapes to simulate "content"
    d.rectangle([0, height//2, width, height], fill=(30, 30, 30))
    
    # Text
    text = "Team Photo Placeholder\n(Replace with your image)"
    # Load default font
    try:
        # Try to load a font, or use default
        font = ImageFont.truetype("arial.ttf", 60)
    except IOError:
        font = ImageFont.load_default()

    # Calculate text position
    # standard textsize is deprecated in recent Pillow, but let's try a simple center logic
    # or just place it roughly
    d.text((width//2 - 300, height//2 - 50), text, fill=(200, 200, 200), font=font)

    img.save(output_path)
    print(f"Created placeholder at {output_path}")

output_file = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\team-hero.jpg"
create_placeholder(output_file)
