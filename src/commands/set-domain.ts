import fs from "node:fs";
import path from "node:path";

import { Command } from "commander";

import { getProfilePath } from "@/utils/get-profile-path";

export const setDomain =  new Command("set")
  .description("Add or update a domain in a profile")
  .argument("<profile>", "The name of the profile to update")
  .argument("<domain>", "The domain to add or update")
  .argument("[envVar]", "Optional environment variable name for this domain (defaults to the domain itself)")
  .action((profile, domain, envVar = domain) => {
    const profileFile = path.join(getProfilePath(), `${profile}.json`);
    const dir = path.dirname(profileFile);
  
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
    let data: Record<string, string> = {};
  
    if (fs.existsSync(profileFile)) {
      data = JSON.parse(fs.readFileSync(profileFile, "utf-8"));
    }
  
    data[domain] = envVar;
  
    fs.writeFileSync(profileFile, JSON.stringify(data), "utf-8");
  })