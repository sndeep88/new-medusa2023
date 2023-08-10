#!/bin/bash

npm install

npm run build &> /dev/null

medusa migrations run

medusa $1
