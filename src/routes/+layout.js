// Bez prerenderu: stránky se renderují serverem za běhu, takže se čte
// PUBLIC_API_URL z prostředí běžícího serveru ($env/dynamic/public), ne z buildu.
export const prerender = false;
