import { createOctokit } from "./lib/createOctokit.js";
import { getHostedPortalRepositories } from "./lib/getHostedPortalRepositories.js";
import { gatherReleaseInfo } from "./lib/gatherReleaseInfo.js";
import { triggerDeployment } from "./lib/triggerDeployment.js";
import { assertNecessaryAccess } from "./lib/assertNecessaryAccess.js";

// Authenticate with GitHub
const octokit = await createOctokit();

// Get all hosted portal repositories
const hostedPortalRepos = await getHostedPortalRepositories(octokit);

// Make sure the user has access to all repositories
assertNecessaryAccess(hostedPortalRepos);

// Prompt for release info
const releaseInfo = await gatherReleaseInfo();

// Trigger deployments
for (const hostedPortalRepo of hostedPortalRepos) {
  console.log(`Triggering deployment for ${hostedPortalRepo.name}...`);
  await triggerDeployment(octokit, hostedPortalRepo, releaseInfo);
}
