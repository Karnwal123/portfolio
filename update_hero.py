#!/usr/bin/env python3
import sys

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and replace lines 38-40 (index 37-39)
new_lines = []
i = 0
while i < len(lines):
    if i == 37 and 'I\'m a passionate' in lines[i]:
        # Replace this and next line
        new_lines.append('        <p>\n')
        new_lines.append('          Software Engineer specializing in building intelligent, scalable, and high-performance web applications using React.js, JavaScript, and Redux. Passionate about integrating AI-powered technologies and modern development workflows to create seamless, responsive, and user-centric digital experiences.\n')
        new_lines.append('        </p>\n')
        new_lines.append('        <p>\n')
        new_lines.append('          Experienced in developing reusable UI components, integrating RESTful and AI-driven APIs, and optimizing application performance for scalability and efficiency. Skilled in leveraging tools like GitHub Copilot, Cursor AI, and OpenAI APIs to enhance productivity, streamline debugging, and accelerate development cycles.\n')
        new_lines.append('        </p>\n')
        new_lines.append('        <p>\n')
        new_lines.append('          Focused on clean architecture, modern UI/UX standards, and intelligent application design, with a strong ability to collaborate across teams and deliver impactful technology solutions.\n')
        new_lines.append('        </p>\n')
        i += 3  # Skip next 3 lines (38, 39, 40)
    else:
        new_lines.append(lines[i])
        i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ Hero section updated successfully!")
