#!/bin/bash
cd playwright

start_time=$(date +%s)
echo "Test started at: $(date '+%Y-%m-%d %H:%M:%S')"

# Run Playwright test
npx playwright test ./playwright/e2e/ui.spec.js --project "Google Chrome"

end_time=$(date +%s)
echo "Test completed at: $(date '+%Y-%m-%d %H:%M:%S')"

# Calculate duration
duration=$((end_time - start_time))

# Convert to hours:minutes:seconds format
hours=$((duration / 3600))
minutes=$(( (duration % 3600) / 60 ))
seconds=$((duration % 60))

echo "Test duration: $duration seconds"
echo "Test duration: ${hours}h ${minutes}m ${seconds}s"