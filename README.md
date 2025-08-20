# ssl-public-key

A CLI tool to fetch and manage TLS public keys, printing their **SPKI SHA256** fingerprints in base64.
Useful for SSL pinning and security configurations.

```bash
npx ssl-public-key --help
```

## 📖 Usage

```bash
npx ssl-public-key [command] [options]
```

Options
```bash
-v, --version    output the version number
-h, --help       display help for command
```

Commands
```bash
get-public-key <domain>           Gets the TLS certificate for a domain and prints its SPKI SHA256 fingerprint in base64
get [options] <profile>           Fetch all public keys from a profile
list-profiles                     List all profiles
remove-profile <profile>          Remove an entire profile
set <profile> <domain> [envVar]   Add or update a domain in a profile
remove <profile> <domain>         Remove a domain from a profile
help [command]                    Display help for command
```
