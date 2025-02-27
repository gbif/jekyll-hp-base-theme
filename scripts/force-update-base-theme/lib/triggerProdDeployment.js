// Creating a new release with the same commit ref as the latest release will trigger a deployment to production
export async function triggerProdDeployment(
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
    latestCommitSha = latestRelease.target_commitish;
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
