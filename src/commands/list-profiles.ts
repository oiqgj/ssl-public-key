import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";

import { getProfilePath } from "@/utils/get-profile-path";

export const listProfiles = new Command("list-profiles")
  .description("List all profiles")
  .action(() => {
    const basePath = getProfilePath();

    if (!fs.existsSync(basePath)) return;

    const files = fs.readdirSync(basePath);

    files.forEach((file) => {
      console.log(path.basename(file, ".json"));
    });
  });