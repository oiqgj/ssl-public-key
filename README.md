# ssl-public-key
A command-line utility for extracting and managing public keys from SSL/TLS certificates. It retrieves the SPKI SHA256 fingerprint in base64 format, ideal for tasks like certificate pinning in secure applications.

## Features
- Fetch public key fingerprints for individual domains.
- Manage profiles to group multiple domains for batch operations.
- Simple profile management: add, update, remove domains and entire profiles.
- Optional association of environment variables with domains in profiles.

## Quick Start
Run `npx ssl-public-key --help` to see all available commands and options.

## Commands and Options
### Global Options
- `-v, --version`: Displays the current version.
- `-h, --help`: Shows help information.

## Default Command
The default command is `get-public-key <domain>`.

### Available Commands
|Command|Description|Arguments|Options|
|:---|:---|:---|:---|
|`get-public-key <domain>`|Retrieve the public key for a specific domain.|`<domain>`: The domain name (e.g., example.com).|None|
|`get [options] <profile>`|Fetches public keys for all domains in the specified profile.|`<profile>`: Profile name.|`--env`:Specify the output format (json or env) (default: false)|
|`list-profiles`|Lists all existing profiles.|None|None|
|`remove-profile <profile>`|Deletes the entire profile.|`<profile>`: Profile name.|None|
|`set <profile> <domain> [envVar]`|Adds or updates a domain in the profile, optionally with an environment variable name.|`<profile>`: Profile name.<br>`<domain>`: Domain to add.<br>`[envVar]`: Optional env var (e.g., API_KEY).|None|
|`remove <profile> <domain>`|Removes a specific domain from the profile.|`<profile>`:Profile name.<br>`<domain>`:Domain to remove.|None|
|`help [command]`| Displays help for a specific command.| `[command]`: Optional command name.|None|

Profiles are stored locally and allow grouping domains for efficient management and batch fetching.

## Usage Examples
### Fetching a Single Domain's Public Key
```bash
npx ssl-public-key google.com
```
Or
```bash
npx ssl-public-key get-public-key google.com
```

Output: A base64-encoded SHA256 fingerprint.

### Managing Profiles
Create a profile with a domain:
```bash
npx ssl-public-key set example-profile google.com API_CERT
```
Fetch all keys in the profile:
```bash
npx ssl-public-key get example-profile
```
List profiles:
```bash
npx ssl-public-key list-profiles
```
Update a domain's environment variable name:
```bash
npx ssl-public-key set example-profile google.com API_CERT_GOOGLE
```
Remove a domain:
```bash
npx ssl-public-key remove example-profile google.com
```
Delete the profile:
```bash
npx ssl-public-key remove-profile example-profile
```

## How it works?
The tool connects to the domain over TLS, extracts the certificate's public key, computes the SHA256 hash of the Subject Public Key Info (SPKI), and encodes it in base64. Profiles are stored in a local JSON file for easy access.

## Development
The project is written in TypeScript. To contribute:
- Fork the repo.
- Create a feature branch.
- Commit changes.
- Push and open a PR.

## License
MIT License.

## Issues and Support
Report bugs or suggest features via [GitHub issues](https://github.com/oiqgj/ssl-public-key/issues)