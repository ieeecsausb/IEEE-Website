from PIL import Image
import os

def remove_background(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully saved transparent logo to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

input_file = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\ieee-logo.png"
output_file = r"c:\Users\kaush\OneDrive\Desktop\IEEE CS AU\IEEE-Website\website-ieee\frontend\src\assets\ieee-logo-transparent.png"

if os.path.exists(input_file):
    remove_background(input_file, output_file)
else:
    print(f"Input file not found: {input_file}")
