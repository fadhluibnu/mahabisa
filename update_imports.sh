#!/bin/bash
# Script to update imports in React files

# Create new Components directory if it doesn't exist
mkdir -p "d:/KULIAH/D. SEMESTER 4/3. Rekayasa Perangkat Lunak/Projek MahaBisa/mahabisa/resources/js/Components"

# Copy components from Pages/Components to the root Components directory
cp "d:/KULIAH/D. SEMESTER 4/3. Rekayasa Perangkat Lunak/Projek MahaBisa/mahabisa/resources/js/Pages/Components"/* "d:/KULIAH/D. SEMESTER 4/3. Rekayasa Perangkat Lunak/Projek MahaBisa/mahabisa/resources/js/Components/"

# Update all imports that reference the old components location
find "d:/KULIAH/D. SEMESTER 4/3. Rekayasa Perangkat Lunak/Projek MahaBisa/mahabisa/resources/js/Pages" -type f -name "*.jsx" | xargs sed -i -E 's|from '\''(\.\.\/)+Components\/|from '\''@/Components/|g'

echo "Component files moved and imports updated"

# Remove the Test directory as it's unused
rm -rf "d:/KULIAH/D. SEMESTER 4/3. Rekayasa Perangkat Lunak/Projek MahaBisa/mahabisa/resources/js/Pages/Test"

echo "Test directory removed"
