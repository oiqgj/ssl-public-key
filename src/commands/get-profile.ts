import fs from "node:fs";
import path from "node:path";

import { Command } from "commander";

import { getProfilePath } from "@/utils/get-profile-path";
import { getSpkiSha256 } from "@/utils/get-spki";

export const getProfile = new Command("get")
  .description("Fetch all public keys from a profile")
  .argument("<profile>", "The name of the profile to fetch")
  .option(
    "--env",
    "Specify the output format (json or env)",
    false
  )
  .action(async (profile, options) => {
    const profileFile = path.join(getProfilePath(), `${profile}.json`);

    if (!fs.existsSync(profileFile)) return;

    const data = JSON.parse(fs.readFileSync(profileFile, "utf-8"));

    const entries = Object.entries(data);

    const results = await Promise.all(
      entries.map(async ([domain, envVar]) => {
        const key = await getSpkiSha256(domain);
        const option = options.env ? String(envVar) : domain;
        return { [option]: key };
      })
    );

    const final = Object.assign({}, ...results);

    console.log(
      options.env
        ? Object.entries(final).map(([k, v]) => `${k}=${v}`).join("\n")
        : JSON.stringify(final, null, 2)
    );
  })