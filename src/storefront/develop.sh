#!/bin/bash

npm install

npm run build &> /dev/null

npm run $1
# npm run develop
# npm run develop