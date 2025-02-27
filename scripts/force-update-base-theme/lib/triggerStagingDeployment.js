// Creating a new empty commit to master will trigger a deployment to staging
export async function triggerStagingDeployment(
  octokit,
  hostedPortalRepo,
  releaseInfo
) {
  const {
    owner: { login: owner },
    name: repo,
  } = hostedPortalRepo;
  const targetBranch = "master";

  // Get the latest commit SHA from the target branch
  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${targetBranch}`,
  });
  const latestCommitSha = refData.object.sha;

  // Get the latest commit to use as a parent
  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: latestCommitSha,
  });

  // Create the empty commit
  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: releaseInfo.commitMessage,
    tree: commitData.tree.sha,
    parents: [latestCommitSha],
  });

  // Update the branch reference to point to the new commit
  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${targetBranch}`,
    sha: newCommit.sha,
  });
}
