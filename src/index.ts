#!/usr/bin/env node

import { program } from "commander";

import { getProfile, getPublickKey, listProfiles, removeDomain, removeProfile, setDomain } from "./commands";

program
  .name("ssl-public-key")
  .description("Extract the public key from an SSL/TLS certificate")
  .version("0.0.1", "-v, --version");

program.addCommand(getPublickKey, { isDefault: true });

program.addCommand(getProfile);
program.addCommand(listProfiles);
program.addCommand(removeProfile);

program.addCommand(setDomain);
program.addCommand(removeDomain);

program.parse()


