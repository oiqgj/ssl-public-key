import fs from "node:fs";
import path from "node:path";

import { Command } from "commander";

import { getProfilePath } from "@/utils/get-profile-path";

export const removeDomain = new Command("remove")
  .description("Remove a domain from a profile")
  .argument("<profile>", "The name of the profile to update")
  .argument("<domain>", "The domain to remove")
  .action((profile, domain) => {
    const profileFile = path.join(getProfilePath(), `${profile}.json`);
  
    if (!fs.existsSync(profileFile)) return;
  
    const data: Record<string, string> = JSON.parse(fs.readFileSync(profileFile, "utf-8"));
  
    if (domain in data) {
      delete data[domain];
      fs.writeFileSync(profileFile, JSON.stringify(data), "utf-8");
    }
  })