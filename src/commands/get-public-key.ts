import { Command } from "commander";

import { getSpkiSha256 } from "../utils/get-spki";

export const getPublickKey = new Command('get-public-key')
  .description('Gets the TLS certificate for a domain and prints its SPKI SHA256 fingerprint in base64')
  .argument('<domain>', 'The domain name to retrieve the certificate from')
  .action(async (domain) => {
    await getSpkiSha256(domain)
      .then(res => console.log(res))
      .catch(console.error);
  })