#!/bin/bash

# Exit immediately if any command fails
set -e

# ANSI Color Codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}       J.A.G. Portfolio - Video Optimizer           ${NC}"
echo -e "${BLUE}====================================================${NC}"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed. Please install it (e.g., 'brew install ffmpeg') and try again.${NC}"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}Warning: cwebp (from webp toolkit) is not installed.${NC}"
    echo -e "${YELLOW}Thumbnails will remain as PNGs. To enable WebP conversion, run: 'brew install webp'${NC}"
    USE_WEBP=false
else
    USE_WEBP=true
fi

# Validate arguments
if [ "$#" -lt 1 ]; then
    echo -e "${YELLOW}Usage: $0 <input_video_path> [thumbnail_timestamp_seconds]${NC}"
    echo -e "Example: $0 videos/my_new_film.MP4 2"
    exit 1
fi

INPUT_FILE="$1"
THUMB_TIME="${2:-2}" # Default to 2 seconds

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}Error: Input file '$INPUT_FILE' does not exist.${NC}"
    exit 1
fi

# Extract directory, filename, and extension
DIR=$(dirname "$INPUT_FILE")
FILENAME=$(basename "$INPUT_FILE")
BASE_NAME="${FILENAME%.*}"
EXT="${FILENAME##*.}"

# Target output paths
# We use temporary filenames for encoding to avoid case-insensitive collisions (e.g., .MP4 overriding .mp4)
TEMP_MP4="${DIR}/${BASE_NAME}_temp.mp4"
TEMP_WEBM="${DIR}/${BASE_NAME}_temp.webm"
TEMP_PNG="${DIR}/${BASE_NAME}_temp.png"

FINAL_MP4="${DIR}/${BASE_NAME}.mp4"
FINAL_WEBM="${DIR}/${BASE_NAME}.webm"
FINAL_WEBP="${DIR}/${BASE_NAME}.webp"
FINAL_PNG="${DIR}/${BASE_NAME}.png"

echo -e "${YELLOW}Optimizing:${NC} $INPUT_FILE"
echo -e "${YELLOW}Output Dir:${NC} $DIR"
echo -e "${YELLOW}Base Name:${NC} $BASE_NAME"
echo -e "${YELLOW}Thumbnail time:${NC} ${THUMB_TIME}s"
echo -e "${BLUE}----------------------------------------------------${NC}"

# Step 1: Extract Thumbnail
echo -e "${BLUE}[1/4] Extracting thumbnail frame...${NC}"
ffmpeg -i "$INPUT_FILE" -ss "$THUMB_TIME" -vframes 1 -vf "scale=1280:720" -y "$TEMP_PNG"

if [ "$USE_WEBP" = true ]; then
    echo -e "${BLUE}[2/4] Converting thumbnail to optimized WebP...${NC}"
    cwebp -q 80 "$TEMP_PNG" -o "$FINAL_WEBP"
    rm -f "$TEMP_PNG"
    echo -e "${GREEN}✓ Thumbnail created:${NC} $FINAL_WEBP ($(ls -lh "$FINAL_WEBP" | awk '{print $5}'))"
else
    mv "$TEMP_PNG" "$FINAL_PNG"
    echo -e "${GREEN}✓ Thumbnail created:${NC} $FINAL_PNG ($(ls -lh "$FINAL_PNG" | awk '{print $5}'))"
fi

# Step 2: Encode to WebM (VP9, 720p, Muted)
echo -e "${BLUE}[3/4] Encoding to WebM (VP9, 720p, 25fps, muted)...${NC}"
ffmpeg -i "$INPUT_FILE" -c:v libvpx-vp9 -pix_fmt yuv420p -crf 30 -b:v 0 -an -speed 4 -vf "scale=1280:720" -y "$TEMP_WEBM"

# Step 3: Encode to MP4 (H.264, 720p, Muted, Faststart)
echo -e "${BLUE}[4/4] Encoding to MP4 (H.264, 720p, 25fps, muted, faststart)...${NC}"
ffmpeg -i "$INPUT_FILE" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:720" -an -y "$TEMP_MP4"

# Step 4: Safely replace files (handles case-insensitive filesystems)
ORIGINAL_SIZE=$(ls -lh "$INPUT_FILE" | awk '{print $5}')

echo -e "${BLUE}----------------------------------------------------${NC}"
echo -e "${YELLOW}Finalizing files...${NC}"

# Check if input has the same name as outputs (case-insensitively)
LOWER_INPUT=$(echo "$INPUT_FILE" | tr '[:upper:]' '[:lower:]')
LOWER_MP4=$(echo "$FINAL_MP4" | tr '[:upper:]' '[:lower:]')

if [ "$LOWER_INPUT" = "$LOWER_MP4" ]; then
    echo -e "${YELLOW}Cleaning up original input file to prevent path collisions...${NC}"
    rm -f "$INPUT_FILE"
fi

mv "$TEMP_MP4" "$FINAL_MP4"
mv "$TEMP_WEBM" "$FINAL_WEBM"

echo -e "${GREEN}✓ WebM created:${NC} $FINAL_WEBM ($(ls -lh "$FINAL_WEBM" | awk '{print $5}'))"
echo -e "${GREEN}✓ MP4 created:${NC} $FINAL_MP4 ($(ls -lh "$FINAL_MP4" | awk '{print $5}'))"

echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}Success! Media optimized successfully.${NC}"
echo -e "${YELLOW}Original Size:${NC} $ORIGINAL_SIZE"
if [ "$USE_WEBP" = true ]; then
    NEW_TOTAL=$(du -ch "$FINAL_WEBM" "$FINAL_MP4" "$FINAL_WEBP" | grep total | awk '{print $1}')
else
    NEW_TOTAL=$(du -ch "$FINAL_WEBM" "$FINAL_MP4" "$FINAL_PNG" | grep total | awk '{print $1}')
fi
echo -e "${YELLOW}Optimized Total Size:${NC} $NEW_TOTAL"
echo -e "${BLUE}====================================================${NC}"
echo -e "You can now add this slide to the films list in js/main.js:"
echo -e "{"
echo -e "    title: '$(echo "$BASE_NAME" | tr '[:lower:]' '[:upper:]' | tr '_' ' ' | tr '-' ' ')',"
if [ "$USE_WEBP" = true ]; then
    echo -e "    thumbnail: '$FINAL_WEBP',"
else
    echo -e "    thumbnail: '$FINAL_PNG',"
fi
echo -e "    src: '$FINAL_WEBM',"
echo -e "    mp4: '$FINAL_MP4'"
echo -e "}"
