# platby frontend

Frontend ve Svelte k platebnímu systému.  
Backend je v repozitáři [platby](https://github.com/veldik/platby).

## Nasazení
Frontend běží jako Node aplikace (SvelteKit + `@sveltejs/adapter-node`).
Build: `npm ci && npm run build`, spuštění: `npm start` (`node build`),
server poslouchá na `0.0.0.0` a portu z `PORT` (výchozí `3000`).

### Proměnné prostředí
| proměnná | hodnota | popis |
| --- | --- | --- |
| PUBLIC_API_URL | https://api.platby.thevelda.eu | adresa API — čte se za běhu (`$env/dynamic/public`) |
| PROTOCOL_HEADER | x-forwarded-proto | důvěra reverzní proxy (HTTPS) |
| HOST_HEADER | x-forwarded-host | důvěra reverzní proxy (hostname) |

## Vývoj

Nejprve je třeba zkopírovat soubor `.env.example` do `.env` a upravit podle potřeby, což znamená nastavit `PUBLIC_API_URL` na adresu vašeho backendu.

Pro první spuštění vývojového serveru použijte příkaz:

```bash
npm install
npm run dev
```

Tím se spustí vývojový sever.

Pro každé další spuštění, pokud se nezměnily závislosti, stačí použít pouze:

```bash
npm run dev
```