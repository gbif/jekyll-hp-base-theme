export function assertNecessaryAccess(hostedPortalRepos) {
  console.log("Making sure you have access to all repositories...");
  const reposWithoutAccess = hostedPortalRepos.filter(
    (repo) => !repo.permissions.admin
  );

  if (reposWithoutAccess.length > 0) {
    console.error("You do not have admin access to the following repositories:");
    reposWithoutAccess.forEach((repo) => console.error(`- ${repo.full_name}`));
    process.exit(1);
  }

  console.log("You have access to all repositories.");
}
