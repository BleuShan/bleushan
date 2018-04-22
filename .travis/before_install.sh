#!/bin/bash
set -e
# Note: do not do set -x or the passwords will leak!

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "We are in a pull request, not setting up release"
  exit 0
fi

if [[ $TRAVIS_BRANCH == 'master' ]]; then
  rm -rf .git
  git init
  git clean -dfx
  git remote add origin https://github.com/BleuShan/bleushan.git
  git fetch origin
  git clone https://github.com/$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG
  git checkout $TRAVIS_BRANCH

  git config credential.helper store
  echo "https://${RELEASE_GH_USERNAME}:${RELEASE_GH_TOKEN}@github.com/BleuShan/bleushan.git" > ~/.git-credentials

  curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.6.0
  export PATH=$HOME/.yarn/bin:$PATH

  git config --global user.email "lafontaine.philippe@gmail.com"
  git config --global user.name "Philippe Lafontaine"
  git config --global push.default simple

  git fetch --tags
  git branch -u origin/$TRAVIS_BRANCH
  git fsck --full #debug
  echo "npm whoami"
  npm whoami #debug
  echo "git config --list"
  git config --list #debug
fi
