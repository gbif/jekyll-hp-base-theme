import { createOctokit } from "./lib/createOctokit.js";
import { getHostedPortalRepositories } from "./lib/getHostedPortalRepositories.js";
import { gatherReleaseInfo } from "./lib/gatherReleaseInfo.js";
import { triggerProdDeployment } from "./lib/triggerProdDeployment.js";
import { triggerStagingDeployment } from "./lib/triggerStagingDeployment.js";

// Authenticate with GitHub
const octokit = await createOctokit();

// Get all hosted portal repositories
const hostedPortalRepos = await getHostedPortalRepositories(octokit);

// Prompt for release info
const releaseInfo = await gatherReleaseInfo();

// Trigger deployments
for (const hostedPortalRepo of hostedPortalRepos) {
  console.log(`Triggering deployment for ${hostedPortalRepo.name}...`);
  await triggerStagingDeployment(octokit, hostedPortalRepo, releaseInfo);
  await triggerProdDeployment(octokit, hostedPortalRepo, releaseInfo);
}




