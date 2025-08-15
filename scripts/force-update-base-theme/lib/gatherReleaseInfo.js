import inquirer from "inquirer";

export async function gatherReleaseInfo() {
  const anwsers = await inquirer.prompt([
    {
      type: "input",
      name: "tag",
      message: "Release tag",
      default: "trigger-base-theme-update",
    },
    {
      type: "input",
      name: "title",
      message: "Release title",
      default: "Trigger base-theme update",
    },
    {
      type: "input",
      name: "description",
      message: "Release description",
      default:
        "This release triggers a redeployment that will include a new version of the hosted portal base theme.",
    },
  ]);

  // Add timestamp to tag to ensure uniqueness
  anwsers.tag = `${anwsers.tag}-${Date.now()}`;

  console.log("Your final release info is:", anwsers);
  console.log(
    "Note a timestamp has been added to the tag name to ensure uniqueness"
  );

  return anwsers;
}
