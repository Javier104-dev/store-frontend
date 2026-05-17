#!/bin/sh

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ -f .env.dist ]; then
  printf "${BLUE}Updating environment variables in your .env file...${NC}\n"
else
  printf "\n${RED}ERROR: .env.dist file not found${NC}\n\n"
  exit 1
fi

if [ ! -f .env ]; then
  touch .env
  printf "${BLUE}Created new .env file${NC}\n"
fi

EXISTING_VARS=$(mktemp)
SECTION_ORDER=$(mktemp)
SECTION_CONTENT=$(mktemp)

while IFS= read -r line || [ -n "$line" ]; do
  if echo "$line" | grep -v "^#" | grep "=" > /dev/null; then
    var_name=$(echo "$line" | cut -d= -f1)
    echo "$var_name" >> "$EXISTING_VARS"
  fi
done < .env

current_section="# General"
echo "$current_section" >> "$SECTION_ORDER"

while IFS= read -r line || [ -n "$line" ]; do
  if echo "$line" | grep "^#" > /dev/null; then
    current_section="$line"
    if ! grep -Fx "$current_section" "$SECTION_ORDER" > /dev/null; then
      echo "$current_section" >> "$SECTION_ORDER"
    fi
    continue
  fi

  if echo "$line" | grep "=" > /dev/null; then
    echo "${current_section}:${line}" >> "$SECTION_CONTENT"
  fi
done < .env.dist

total_added=0
current_section=""

while IFS= read -r section; do
  missing_lines_found=0
  
  while IFS= read -r content || [ -n "$content" ]; do
    section_from_content=$(echo "$content" | cut -d: -f1)
    
    if [ "$section_from_content" = "$section" ]; then
      line=$(echo "$content" | cut -d: -f2-)
      var_name=$(echo "$line" | cut -d= -f1)
      
      if ! grep -Fx "$var_name" "$EXISTING_VARS" > /dev/null; then
        if [ "$missing_lines_found" -eq 0 ]; then
          printf "\n%s\n" "$section" >> .env
          missing_lines_found=1
        fi
        
        printf "%s\n" "$line" >> .env
        printf "\t- ${GREEN}%s added${NC}\n" "$var_name"
        total_added=$((total_added + 1))
        
        echo "$var_name" >> "$EXISTING_VARS"
      fi
    fi
  done < "$SECTION_CONTENT"
done < "$SECTION_ORDER"

rm -f "$EXISTING_VARS" "$SECTION_ORDER" "$SECTION_CONTENT"

printf "\n${GREEN}✓  All environment variables are already up to date.${NC}\n"
