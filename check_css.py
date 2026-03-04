with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

open_braces = content.count('{')
close_braces = content.count('}')

print(f"Open braces: {open_braces}")
print(f"Close braces: {close_braces}")

if open_braces != close_braces:
    print("MISMATCH DETECTED!")
    
    # Simple stack-based check for the first mismatch
    stack = []
    for i, char in enumerate(content):
        if char == '{':
            stack.append(i)
        elif char == '}':
            if not stack:
                print(f"Unexpected closing brace at index {i}")
            else:
                stack.pop()
    
    if stack:
        for pos in stack:
            # Find line number
            line_num = content[:pos].count('\n') + 1
            print(f"Unclosed opening brace at line {line_num} (index {pos})")
else:
    print("Braces match exactly.")
