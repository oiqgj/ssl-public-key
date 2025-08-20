import os from "node:os";
import path from "node:path";

const home = os.homedir();

export const getProfilePath = () => {
  if (process.platform === 'win32') {
    return process.env.APPDATA
      ? path.join(process.env.APPDATA, "ssl-public-key")
      : path.join(home, "AppData", "Roaming", "ssl-public-key");
  }

  return path.join(home, ".ssl-public-key");
}