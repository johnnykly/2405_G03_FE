- URL till alla GitHub-Repon (källkoden)
- Info om hur man deployar koden.
- En lista över alla endpoints (API) med exempel
- Steg för steg info om hur man deployar hela siten till en ny server
- Enkel vägledning för användning av siten
- Eventuella gruppspesifika login såsom inlogg till atlas sålänge de inte är kopplade till privata mailadresser (frivilligt)
- Postman export (frivilligt)
- Enviroment variabler som används lokalt
- Enviroment variabler som används i deployat läge
- Information om hur man startar projektet lokalt
 

Detta dokument måste finnas på er Confluence inför presentationen.
 

Överlämning av frontend

Eleverna ska skapa en tydlig dokumentation av sin kodbas. Gör detta i en README-fil (finns redan, skapa en sektion för frontend). Detta kan inkludera t.ex (endast det som är relevant för ert projekt):

README.md – En fil som beskriver projektet, dess syfte, hur man kör det, och vilka teknologier som används.
Kodstruktur och arkitektur – En kort beskrivning av mappstrukturen och viktiga filer.
Setup och installation – Instruktioner om hur man installerar och kör projektet lokalt. Behövs något för att köra koden t.ex Sass compiler?
Kodbibliotek & teknologier - Vilka kodbibliotek används i projektet? Länka till dokumentation.
Förbättringspunkter - Finns det platser i kodbasen ni skulle önska förbättra/skriva om i mån av tid?
Hjälp-funktioner (t.ex för API-anrop) - Vilka funktioner kan/bör återanvändas genomgående i projektet, och vart hittar man dem?

# Projektnamn: Hakim Livs

# Projektbeskrivning
En fil som beskriver projektet, dess syfte, hur man kör det, och vilka teknologier som används.

- Detta är ett skräddarsytt projekt som utvecklades under en månadslång skräddarsydd agile-skrum-collaboration mellan 3 frontend-utvecklare, 2 backend-utvecklare och 3 kvalitetstester.

- Projektet startade den 17 mars 2025 och syftar till att skapa en webbshop, Hakim Livs, där användare kan köpa produkter på nätet.

- Projektet innehåller följande viktiga funktioner:

## Vanliga användare:

- **Medlemskap och autentisering** : Användare kan skapa ett konto genom att registrera sig med e-post och lösenord. De kan sedan logga in med sina uppgifter. Inloggning och registrering är säkrad med JWT (JSON Web Tokens) för autentisering.

- **Produktrelaterad funktionalitet**: Användare kan:

- Bläddra bland produkter.

- Lägga produkter i kundvagnen.

- Genomföra köp genom en säker betalningsgateway (finns i nästa utvecklingsfas).

- **API-integration med backend** : Alla produktuppgifter, användarhantering och orderdata hanteras genom en REST API som är integrerad med backend-servern.

## Admin (Hakim):

- **Admin Panel (Backoffice)**: 
- Administratörer, såsom Hakim, kan hantera produktinformationen, användare och ordrar genom en admin-panel. Denna panel gör det möjligt för administratörer att:

 - Skapa, uppdatera och ta bort produkter.

 - Se och hantera användarkonton och orderhistorik.

- **Säkerhet och behörigheter** : Endast användare med administratörsbehörighet kan få åtkomst till admin-panelen. Säker autentisering och behörighetskontroll implementeras via JWT, där admin-användare identifieras och autentiseras.

## Syfte
Beskriv kortfattat projektets syfte, exempelvis vad applikationen gör och vilket problem den löser.



## Teknologier

- **Frontend:** Beskriv vilka teknologier och ramverk som används för frontend, 

- **Övrigt:** Nämn alla andra teknologier som används (t.ex. API:er, externa tjänster etc.)

# Kodstruktur och Arkitektur
En kort beskrivning av mappstrukturen och viktiga filer.




## Mappstruktur
Beskriv kort strukturen av projektets mappar och vad de innehåller.




## Använd språk:

- JavaScript – För både frontend och backend.

- Vanilla CSS – För stilhantering på frontend.

- HTML5 – Struktur och layout på webbplatsen.

- Figma – För design och UI/UX prototyper.

## Installation och Setup

1. **fork repo** och **git clone repo**
```bash
 Jonatan-Vahlberg-WAS/BE-Webshop-2025-FE
```

```bash
https://github.com/johnnykly/2405_G03_FE
```
2. Vercel- och GitHub-integration:

- Vercel konto: Skapa ett Vercel-konto eller logga in på Vercel.

- Deploy till Vercel: Koppla Vercel till ditt GitHub-konto och välj repositoryn för att distribuera applikationen.

- Automatisk deploy: När du pushar nya ändringar till GitHub kommer applikationen automatiskt att uppdateras och distribueras på Vercel.

# Förbättringspunkter

Finns det platser i kodbasen ni skulle önska förbättra/skriva om i mån av tid?

- Refaktorering av vissa funktioner för att minska komplexiteten.

- Optimering av databasfrågor för bättre prestanda.

- Implementering av mer omfattande tester för API-rutter och funktionalitet.