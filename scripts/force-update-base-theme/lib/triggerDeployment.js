// Creating a new release with the same commit ref as the latest release will trigger a deployment to production
// This will also trigger a redeployment of staging (using master)
export async function triggerDeployment(
  octokit,
  hostedPortalRepo,
  releaseInfo
) {
  const {
    owner: { login: owner },
    name: repo,
  } = hostedPortalRepo;

  let latestCommitSha;

  try {
    // Get the latest release
    const { data: latestRelease } = await octokit.repos.getLatestRelease({
      owner,
      repo,
    });

    // Get commit SHA from the tag
    const tagName = latestRelease.tag_name;
    const { data: tagData } = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: tagName,
    });

    latestCommitSha = tagData.sha;
  } catch (error) {
    if (error.status === 404) {
      console.log(`${repo}: No release found - Skipping production deployment`);
      return;
    }

    throw error;
  }

  // Create a new release with the same commit ref
  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: releaseInfo.tag,
    target_commitish: latestCommitSha,
    name: releaseInfo.title,
    body: releaseInfo.description,
    draft: false,
    prerelease: false,
  });
}
