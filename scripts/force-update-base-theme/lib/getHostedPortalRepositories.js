export async function getHostedPortalRepositories(octokit) {
  console.log("Getting all hosted portal repositories...");

  const repositories = await getAllGbifRepositories(octokit);
  const hostedPortalRepos = repositories.filter((repo) => {
    return repo.name.startsWith("hp-");
  });

  console.log(`Found ${hostedPortalRepos.length} hosted portal repositories.`);

  return hostedPortalRepos;
}

async function getAllGbifRepositories(octokit) {
  let repos = [];
  let page = 1;
  let response;

  do {
    response = await octokit.repos.listForOrg({
      org: "gbif",
      type: "public",
      per_page: 100,
      page: page,
    });

    repos = repos.concat(response.data);
    page++;
  } while (response.data.length === 100);

  return repos;
}
