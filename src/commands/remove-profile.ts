import fs from "node:fs";
import path from "node:path";

import { Command } from "commander";

import { getProfilePath } from "@/utils/get-profile-path";

export const removeProfile = new Command("remove-profile")
  .description("Remove an entire profile")
  .argument("<profile>", "The name of the profile to remove")
  .action((profile) => {
    const profileFile = path.join(getProfilePath(), `${profile}.json`);

    if (fs.existsSync(profileFile)) {
      fs.unlinkSync(profileFile);
    }
  })