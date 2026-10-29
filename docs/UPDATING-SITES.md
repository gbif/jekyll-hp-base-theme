# Keeping hosted-portal sites up to date

## Why sites show security warnings
Sites load this theme at build time via `jekyll-remote-theme` (`remote_theme: gbif/jekyll-hp-base-theme`).
That means the theme's own `Gemfile.lock` is **not** used by any site. Each site has its own `Gemfile`
and `Gemfile.lock`, copied from an older version of this repo (Jekyll 4.1.1 from 2020), and GitHub
Dependabot flags the gems in *those* lockfiles (rexml, rubyzip, addressable, concurrent-ruby, ...).
Fixing the theme repo alone does not clear the alerts; every site needs its lockfile regenerated.

## Per-site update (about 5 minutes)
In the site repo:

    /path/to/jekyll-hp-base-theme/scripts/update-site-gems.sh

It bumps Jekyll to `~> 4.4.1`, regenerates `Gemfile.lock`, builds the site and runs `bundle-audit`.
Review the build output, then commit `Gemfile` and `Gemfile.lock`. Sites' CI/Jenkins images need
Ruby >= 3.2 (3.3 recommended, see `.ruby-version`) and Bundler >= 2.4.

## Rolling out to ~100 sites
1. Merge the theme change and tag a release (e.g. `v1.0.0`).
2. Run `scripts/update-site-gems.sh` across all repos (loop over `gbif/hp-*`, clone, run, push a branch,
   open a PR; `scripts/force-update-base-theme` already enumerates the hosted-portal repos and can be
   extended for this). Start with 3-5 varied sites, then the rest in batches.
3. Enable Dependabot version updates in each site (`.github/dependabot.yml`, bundler ecosystem, monthly)
   or, better, enable it org-wide so security PRs arrive automatically.
4. Check the CI/Jenkins build image's Ruby version before merging the first batch.

## Pinning the theme version
`remote_theme: gbif/jekyll-hp-base-theme` follows the default branch, so every site build picks up
theme changes immediately. Consider pinning (`remote_theme: gbif/jekyll-hp-base-theme@v1.0.0`) and
bumping on purpose, using `scripts/force-update-base-theme` to roll out new tags.
