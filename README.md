# Hakim Livs
**Front-End Dokumentation**
##  Kodstruktur och arkitektur
Projektet är uppdelat i följande huvudmappar:
/src
    /data
    /images
        /products
    /scripts
    /utils
/public
/css
index.html
main.js
admin.html
login.html
order.html

## Setup och installation
För att köra projektet lokalt:

Klona repot:

git clone https://github.com/ditt-användarnamn/ditt-projekt.git
Navigera till projektmappen:

cd ditt-projekt
Installera beroenden:

npm install
Starta utvecklingsservern:

npm run dev
Notis: Projektet använder Sass, så en Sass-kompilator krävs. Den hanteras automatiskt via vite/webpack/parcel (beroende på vad ni använder – skriv in det du använder här).

## Kodbibliotek
- HTML5 – Struktur och layout på webbplatsen.
- CSS – För stilhantering på frontend.
- JavaScript – För både frontend och backend.
- Font Awesome - Ikongrafik på webbplatsen
- Figma – För design och UI/UX prototyper.


## Länkar
### Deployment

Git: 
V1: [https://github.com/johnnykly/2405_G03_FE/]
V2: []
fork source [https://github.com/Jonatan-Vahlberg-WAS/BE-Webshop-2025-FE]

Backend kod: [https://github.com/SandraLinnea/Grupp-3]
fork source [https://github.com/Nackademin-BE-1-Admin/Webshop-2025-BE-G1]

LIVE FRONTEND:[https://2405-g03-fe.vercel.app/]
LIVE BACKEND: [https://webshop-2025-be-g1.vercel.app/]

Figma [https://www.figma.com/design/NHNyjULjqwIqo7E0so7iwT/2405%3A-Hakim-Livs?node-id=0-1&t=rvliz4jTLEXBngk6-1]
Figma (prototype) [https://www.figma.com/proto/NHNyjULjqwIqo7E0so7iwT/2405%3A-Hakim-Livs?node-id=0-1&t=rvliz4jTLEXBngk6-1]


## Installation och Setup
Frontend Setup
Ladda ner/klona frontend-projektet:

Gå till -> Frontend Repository
Klicka på den gröna knappen "Code"
Välj "Download ZIP" eller kopiera länken för att klona
Packa upp zip-filen om du laddade ner den
Öppna mappen i VS Code
Kör med Live Server:

Installera Live Server extension i VS Code om du inte redan har det
Högerklicka på index.html
Välj "Open with Live Server" Frontend körs nu på http://localhost:5500


# Miljöer
## 🔧 Development
Backend: http://localhost:3000
Frontend: http://localhost:5500

## 🚀 Production
Backend: LIVE
Frontend: LIVE


## 🗄️ Databas (Supabase)
Supabase används som databas

Be produktägaren (PO) om tillgång till login och nycklar

Databasen och dess struktur är dokumenterad i Supabase-projektet


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

# En lista över alla endpoints (API) med exempel
- Lista på endpoints

    "auth":
      "POST /api/auth/register": "Register a new user",
      "POST /api/auth/login": "Login with username and password"

    "products": 
      "GET /api/products": "Get all products",
      "GET /api/products/:id": "Get a single product by ID",
      "POST /api/products": "Create a new product (Admin only)",
      "PUT /api/products/:id": "Update a product (Admin only)",
      "DELETE /api/products/:id": "Delete a product (Admin only)"
    
    "categories": 
      "GET /api/categories": "Get all categories"
    
    "orders": 
      "GET /api/orders": "Get all orders (Admin only)",
      "GET /api/orders/:id": "Get a specific order",
      "GET /api/orders/user/myorders": "Get current user's orders",
      "POST /api/orders": "Create a new order",
      "PUT /api/orders/:id/status": "Update order status (Admin only)",
      "PUT /api/orders/:id/cancel": "Cancel order"


Connected to backend index.js
[https://grupp-3.vercel.app/api/]

# Steg för steg info om hur man deployar hela siten till en ny server
- Frontend
1. Clone frontend repository
2. Skapa vercel-sida
3. Connecta github repo main branch med vercel
4. Pusha koden till main branch
5. Deploy vercel-sida
- Automatisk deploy: När du pushar nya ändringar till GitHub kommer applikationen automatiskt att uppdateras och distribueras på Vercel.

- Backend
Hänvisning till backend och readme.md

# Enkel vägledning för användning av siten
- index.html

--order.html

--login.html

- admin.html

# Enviroment variabler som används lokalt

# Enviroment variabler som används i deployat läge

# Information om hur man startar projektet lokalt 

# Kodstruktur och arkitektur – En kort beskrivning av mappstrukturen och viktiga filer.

# Hjälp-funktioner (t.ex för API-anrop) - Vilka funktioner kan/bör återanvändas genomgående i projektet, och vart hittar man dem?

---------

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

## Admin (Hakim):

- **Admin Panel (Backoffice)**: 
- Administratörer, såsom Hakim, kan hantera produktinformationen, användare och ordrar genom en admin-panel. Denna panel gör det möjligt för administratörer att:

 - Skapa, uppdatera och ta bort produkter.

 - Se och hantera användarkonton och orderhistorik.

- **Säkerhet och behörigheter** : Endast användare med administratörsbehörighet kan få åtkomst till admin-panelen. Säker autentisering och behörighetskontroll implementeras via JWT, där admin-användare identifieras och autentiseras.

## Teknologier
Länka till dokumentation.

- **Frontend:** Beskriv vilka teknologier och ramverk som används för frontend, 
- **Övrigt:** Nämn alla andra teknologier som används (t.ex. API:er, externa tjänster etc.)

# Kodstruktur och Arkitektur
En kort beskrivning av mappstrukturen och viktiga filer.

## Mappstruktur
Beskriv kort strukturen av projektets mappar och vad de innehåller.


# Förbättringspunkter

Finns det platser i kodbasen ni skulle önska förbättra/skriva om i mån av tid?

- Refaktorering av vissa funktioner för att minska komplexiteten.
- Optimering av databasfrågor för bättre prestanda.
- Implementering av mer omfattande tester för API-rutter och funktionalitet.