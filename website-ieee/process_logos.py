from PIL import Image, ImageChops
import os

def process_logos(input_path, main_output_path, icon_output_path):
    try:
        print(f"Processing {input_path}...")
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        # 1. Background Removal & Cleaning
        new_data = []
        width, height = img.size
        
        # Thresholds
        white_threshold = 200
        black_line_threshold = 50 # Assuming the line is dark
        
        # Analyze for cropping (removing black line at bottom)
        # We will first make background transparent
        for item in datas:
            # Change white/near-white to transparent
            if item[0] > white_threshold and item[1] > white_threshold and item[2] > white_threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        
        # Get bounding box of non-transparent pixels
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
        
        # User mentioned a black line at the bottom. 
        # Let's crop the bottom 2-3 pixels to be safe, or check for dark pixels at the bottom edge.
        # Simple approach: Crop bottom 5 pixels.
        w, h = img.size
        # Ensure we don't crop if image is too small
        if h > 10:
            img = img.crop((0, 0, w, h - 5))
            w, h = img.size # Update dimensions after crop
        
        # Save Main Clean Logo
        img.save(main_output_path, "PNG")
        print(f"Saved cleaned main logo to {main_output_path}")

        # 2. Extract Icon (Minimal "Phi")
        # The icon is usually on the left. We can look for the yellow color.
        # IEEE Color is approx R>200, G>150, B<100
        
        # Find bounding box of 'yellow-ish' pixels
        left, top, right, bottom = w, h, 0, 0
        found_yellow = False
        
        pixels = img.load()
        for x in range(w):
            for y in range(h):
                r, g, b, a = pixels[x, y]
                # Check for yellow-ish (High R/G, Low B) and not transparent
                if a > 0 and r > 180 and g > 140 and b < 100:
                    if x < left: left = x
                    if x > right: right = x
                    if y < top: top = y
                    if y > bottom: bottom = y
                    found_yellow = True

        if found_yellow:
            # Add some padding
            padding = 5
            icon_crop = img.crop((max(0, left - padding), max(0, top - padding), min(w, right + padding), min(h, bottom + padding)))
            icon_crop.save(icon_output_path, "PNG")
            print(f"Saved minimal icon to {icon_output_path}")
        else:
            print("Could not detect yellow icon automatically. Saving left quarter as fallback.")
            icon_crop = img.crop((0, 0, w // 4, h))
            icon_crop.save(icon_output_path, "PNG")

    except Exception as e:
        print(f"Error processing image: {e}")

input_file = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\ieee-logo.png"
main_out = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\ieee-main-clean.png"
icon_out = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\ieee-icon.png"

if os.path.exists(input_file):
    process_logos(input_file, main_out, icon_out)
else:
    print(f"Input file not found: {input_file}")
