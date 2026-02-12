import os

def add_nav_buttons():
    # HTML snippet to inject
    nav_html = '''    <div class="nav-buttons">
        <a href="../index.html" class="btn-home">
            <span>←</span> Back to Dashboard
        </a>
    </div>
'''
    
    # Iterate through all unit directories
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root:
            continue
            
        for file in files:
            if file in ['grammar.html', 'listening.html', 'vocabulary.html']:
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if already added (or if it's the file we manually edited)
                if 'class="btn-home"' in content:
                    print(f"Skipping {file_path} (already exists)")
                    continue
                
                # Find the <h1> tag
                h1_index = content.find('<h1>')
                
                if h1_index == -1:
                    print(f"Warning: <h1> tag not found in {file_path}")
                    continue
                
                # Insert before <h1>
                new_content = content[:h1_index] + nav_html + '    ' + content[h1_index:]
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")

if __name__ == '__main__':
    add_nav_buttons()
