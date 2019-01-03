#!/bin/bash

set -e

echo "Move assets from public/ to public/docs"

# ================================================================ #

# Create a temporary directory that is cleaned up after exit.
# Copied from: https://stackoverflow.com/a/34676160
#

# the temp directory used
WORK_DIR=$(mktemp -d)

# check if tmp dir was created
if [[ ! "$WORK_DIR" || ! -d "$WORK_DIR" ]]; then
  echo "Could not create temp dir"
  exit 1
fi

# deletes the temp directory
function cleanup {
  rm -rf "$WORK_DIR"
  echo "Deleted temp working directory $WORK_DIR"
}

# register the cleanup function to be called on the EXIT signal
trap cleanup EXIT

# ================================================================ #

echo "Move files from public/ to $WORK_DIR"
mv public/* "$WORK_DIR"

echo "Create public/docs directory"
mkdir public/docs

echo "Move files from $WORK_DIR to public/docs"
mv "$WORK_DIR"/* public/docs/

echo "Assets moved to public/docs"

echo "Copying _redirects file to public/"
cp _redirects public/
