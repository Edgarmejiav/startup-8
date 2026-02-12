import os

def add_score_container():
    # HTML snippet to inject
    score_html = '''
    <div id="result-container" class="result-container" style="display: none; margin-top: 2rem; text-align: center; padding: 1rem; background-color: #e2e8f0; border-radius: 8px;">
        <h2>Quiz Complete!</h2>
        <p id="score-text" style="font-size: 1.2rem; font-weight: bold;"></p>
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
                
                # Check if already added
                if 'id="result-container"' in content:
                    print(f"Skipping {file_path} (already exists)")
                    continue
                
                # Find the closing tag of quiz-container. 
                # We assume it's the last </div> before the script tag.
                # All files seem to follow the pattern: </div>\n\n<script src="../script.js"></script>
                
                target_str = '<script src="../script.js"></script>'
                if target_str not in content:
                     # Check for unit 1 which might have slightly different spacing or attributes? 
                     # Or maybe just flexible search.
                     print(f"Warning: Script tag not found in {file_path}")
                     continue

                parts = content.split(target_str)
                pre_script = parts[0]
                post_script = target_str + parts[1]
                
                # Find last closing div in pre_script
                last_div_index = pre_script.rfind('</div>')
                
                if last_div_index == -1:
                    print(f"Warning: Closing div not found in {file_path}")
                    continue
                
                # Insert before the last </div>
                new_content = pre_script[:last_div_index] + score_html + pre_script[last_div_index:] + post_script
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")

if __name__ == '__main__':
    add_score_container()
