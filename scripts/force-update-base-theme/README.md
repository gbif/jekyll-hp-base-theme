# Force update the base theme for all hosted portals

## Prerequisites
Create a .env file and upload a [PERSONAL_GITHUB_TOKEN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

## What the script needs to do
Get all hosted portal repositories  
Create a new commit in each hosted portal repo "Trigger base theme update in staging"

Get the commit id of the latest release.  
Create a new release with the same commit id

Prompt the script user for tag, title and description (The script should be exit with esc or control c)