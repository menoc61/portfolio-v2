#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Define standard sizes
const sizes = {
  "4k": 3840,
  "2k": 2560,
  "hd": 1920,
  "md": 1280,
  "mobile": 768
};

// Get input filename from CLI
const inputFile = process.argv[2];

if (!inputFile) {
  console.error("❌ Please provide an image file as an argument.");
  console.error("Usage: node image-resizer.js <image-file>");
  process.exit(1);
}

// Check if file exists
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: File "${inputFile}" not found.`);
  process.exit(1);
}

// Extract filename without extension
const ext = path.extname(inputFile);
const baseName = path.basename(inputFile, ext);

// Output directory
const outputDir = "output_images";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Process Image Variants
Object.entries(sizes).forEach(async ([key, width]) => {
  const jpgFile = path.join(outputDir, `${baseName}-${key}.jpg`);
  const webpFile = path.join(outputDir, `${baseName}-${key}.webp`);

  try {
    await sharp(inputFile).resize(width).toFile(jpgFile);
    console.log(`✅ Saved: ${jpgFile}`);

    await sharp(inputFile).resize(width).toFormat("webp").toFile(webpFile);
    console.log(`✅ Saved: ${webpFile}`);
  } catch (err) {
    console.error(`❌ Error processing ${key}:`, err);
  }
});

