#!/bin/bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not releasing"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  yarn lerna-semantic-release pre
  yarn lerna-semantic-release post
  yarn lerna-semantic-release perform
fi
