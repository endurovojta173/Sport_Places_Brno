## Generating ssh
1.Generate ssh key
```bash
ssh-keygen -t ed25519 -C "tvuj@email.cz"
```
    • Až se tě zeptá na soubor k uložení, stiskni Enter (ponechá výchozí cestu ~/.ssh/id_ed25519).
    • Až se zeptá na heslo (passphrase), stiskni 2x Enter (zůstane bez hesla pro pohodlné klonování).
2. Turn on agent in pc
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```
3. Copy key from pc, it starts with ssh-ed25519...
```bash
cat ~/.ssh/id_ed25519.pub
```
4. Enter ssh 
https://bitbucket.org/account/settings/ssh-keys/

5. Now you can easily clone using
git clone git@bitbucket.org:mendelu/waf_ls2025-2026_xbrenek.git

## Getting Started
1. Docker desktop must be installed and turned on.

2. Installing node 
```bash
npm install 
```

2. First start
```bash
docker compose up --build
```

3. When developing, start the project using
```bash
docker compose up
```

If there is some error with loading packages, just remove container and built it again
```bash
docker compose down -v
docker compose up --build
```