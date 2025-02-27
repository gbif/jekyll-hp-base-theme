import { Octokit } from "@octokit/rest";

if (!process.env.PERSONAL_GITHUB_TOKEN)
  throw new Error("PERSONAL_GITHUB_TOKEN is required");

export async function createOctokit() {
  const octokit = new Octokit({
    auth: process.env.PERSONAL_GITHUB_TOKEN,
  });

  return octokit;
}
