#!/usr/bin/env bash
# Update the Ruby dependencies of ONE hosted-portal checkout (run from its root).
# Usage: update-site-gems.sh [path-to-site]
set -euo pipefail
cd "${1:-.}"
[ -f Gemfile ] || { echo "no Gemfile, skipping"; exit 0; }
sed -i -E 's/gem "jekyll", "~> 4\.[01]\.[0-9]+"/gem "jekyll", "~> 4.4.1"/; s/gem "tzinfo", "~> 1\.2"/gem "tzinfo", ">= 1.2"/' Gemfile
rm -f Gemfile.lock
bundle install
bundle exec jekyll build -d "${TMPDIR:-/tmp}/site-check-$$"
gem list -i bundler-audit >/dev/null || gem install bundler-audit --no-document
bundle-audit check --update
