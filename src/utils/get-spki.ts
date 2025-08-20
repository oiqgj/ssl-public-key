import crypto from "node:crypto";
import tls from "node:tls";

export const getSpkiSha256 = async (host: string, port = 443) => {
  return new Promise<string>((resolve, reject) => {
    const socket = tls.connect({ host, port, servername: host, rejectUnauthorized: false }, () => {
      try {
        const cert = socket.getPeerCertificate(true);
        socket.end();

        if (!cert.raw) return reject(new Error("No raw certificate available"));

        const pem = [
          "-----BEGIN CERTIFICATE-----",
          cert.raw.toString("base64").match(/.{1,64}/g)?.join("\n"),
          "-----END CERTIFICATE-----"
        ].join("\n");

        const x509 = new crypto.X509Certificate(pem);

        const publicKey = x509.publicKey;

        const der = publicKey.export({ type: "spki", format: "der" });

        const hash = crypto.createHash("sha256").update(der).digest();

        const base64 = hash.toString("base64");

        resolve(base64);
      } catch (err) {
        reject(err);
      }
    });

    socket.on("error", reject);
  });
}