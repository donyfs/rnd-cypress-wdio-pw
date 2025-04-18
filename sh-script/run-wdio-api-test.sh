#!/bin/bash
cd wdio

echo "Reset database"
echo "[]" > ../web-sample/users.json

start_time=$(date +%s)
echo "Test started at: $(date '+%Y-%m-%d %H:%M:%S')"

# Run WDIO test
npx wdio run ./wdio.conf.js --spec test/specs/api.spec.js

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

echo "Reset database"
echo "[]" > ../web-sample/users.json