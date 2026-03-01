#!/bin/bash

cd "$(dirname "$0")/../.." || exit

docker run -p 8000:8000 -v $(pwd):/docs wizardry-guide