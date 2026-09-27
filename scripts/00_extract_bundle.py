import os
import zipfile
import hashlib
import sys

def main():
    zip_path = "SIH26103_project_data_bundle_v3_2_cost_corrected.zip"
    dest_dir = "data_bundle"
    
    if not os.path.exists(zip_path):
        print(f"Error: {zip_path} not found!")
        sys.exit(1)
        
    os.makedirs(dest_dir, exist_ok=True)
    print(f"Extracting {zip_path} to {dest_dir}...")
    with zipfile.ZipFile(zip_path, 'r') as z:
        z.extractall(dest_dir)
    print("Extraction complete!")
    
    # Check top-level folder inside dest_dir
    extracted_root = os.path.join(dest_dir, "SIH26103_project_data_bundle_v3_2_cost_corrected")
    if os.path.exists(extracted_root):
        print(f"Bundle root found at: {extracted_root}")
        subdirs = os.listdir(extracted_root)
        print(f"Subdirectories: {subdirs}")
    else:
        print(f"Warning: extracted root {extracted_root} not found directly.")

if __name__ == "__main__":
    main()
