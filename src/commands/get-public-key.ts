import { Command } from "commander";

import { getSpkiSha256 } from "../utils/get-spki";

export const getPublickKey = new Command('get-public-key')
  .description('Retrieve the public key for a specific domain')
  .argument('<domain>', 'The domain to retrieve the public key from')
  .action(async (domain) => {
    await getSpkiSha256(domain)
      .then(res => console.log(res))
      .catch(console.error);
  })