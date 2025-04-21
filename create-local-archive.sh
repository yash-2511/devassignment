#!/bin/bash

# Create a zip file directly without a temporary directory
echo "Creating project archive for local development..."

# Create the zip file directly, excluding Replit-specific files and other unwanted directories
zip -r design-system-project.zip \
    client/ \
    server/ \
    shared/ \
    attached_assets/ \
    package.json \
    package-lock.json \
    tsconfig.json \
    vite.config.ts \
    drizzle.config.ts \
    postcss.config.js \
    tailwind.config.ts \
    theme.json \
    -x "*.git*" "*.replit*" "*replit.nix*" "*.config*" "*.cache*" "*node_modules*" "*.upm*"

echo "Archive created: design-system-project.zip"
echo "This zip file contains all the necessary files for local development without Replit-specific configuration."

# Instructions for local development
echo ""
echo "==== LOCAL DEVELOPMENT INSTRUCTIONS ===="
echo "1. Extract the zip file to a directory on your computer"
echo "2. Install dependencies with: npm install"
echo "3. Start the development server with: npm run dev"
echo "4. The application will be available at http://localhost:5000"
echo ""
echo "The project uses Vite as the bundler and Express for the backend server."
echo "Happy coding!"