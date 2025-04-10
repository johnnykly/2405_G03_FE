# Hakim Livs
**Front-End Dokumentation** för Hakim Livs.

## Projektbeskrivning
En fil som beskriver projektet, dess syfte, hur man kör det, och vilka teknologier som används.

- Detta är ett skräddarsytt projekt som utvecklades under en månadslång skräddarsydd agile-skrum-collaboration mellan 3 frontend-utvecklare, 2 backend-utvecklare och 3 kvalitetstester.

- Projektet startade den 17 mars 2025 och syftar till att skapa en webbshop, Hakim Livs, där användare kan köpa produkter på nätet.

- Projektet innehåller följande viktiga funktioner:

_Vanliga användare_

- Medlemskap och autentisering: 
 Användare kan skapa ett konto genom att registrera sig med e-post och lösenord. De kan sedan logga in med sina uppgifter. Inloggning och registrering är säkrad med JWT (JSON Web Tokens) för autentisering.

Produktrelaterad funktionalitet
Användare kan:

- Bläddra bland produkter.

- Lägga produkter i kundvagnen.

- Genomföra köp genom en säker betalningsgateway (finns i nästa utvecklingsfas).

Admin (Hakim):

- **Admin Panel (Backoffice)**: 
- Administratörer, såsom Hakim, kan hantera produktinformationen, användare och ordrar genom en admin-panel. Denna panel gör det möjligt för administratörer att:

 - Skapa, uppdatera och ta bort produkter.

 - Se och hantera användarkonton och orderhistorik.

Säkerhet och behörigheter
- Endast användare med administratörsbehörighet kan få åtkomst till admin-panelen. Säker autentisering och behörighetskontroll implementeras via JWT, där admin-användare identifieras och autentiseras.

## Syfte

Lorem ipsum dolor

##  Mappstruktur och arkitektur
Projektet är uppdelat i följande huvudmappar:
```
/src
    /data
    /images
        /products
    /scripts
    /utils
/public
/css
index.html
admin.html
login.html
order.html
main.css
order.css
style.css
header.css
footer.css
global.css
admin.css
```
## Setup och installation
För att köra projektet lokalt:

- Klona repot:
git clone [https://github.com/johnnykly/2405_G03_FE/]

- Navigera till projektmappen:
cd ditt-projekt

- Installera beroenden:
npm install

- Starta utvecklingsservern:
npm run dev

## Kodbibliotek
- HTML5 – Struktur och layout på webbplatsen.
- CSS – För stilhantering på frontend.
- JavaScript – För både frontend och backend.
- Font Awesome - Ikongrafik på webbplatsen.
- Figma – För design och UI/UX prototyper.

## Endpoints (API)
|Metod       |Endpoint       |Beskrivning       |
|  ---  |  ---  |  ---  |
|POST       |auth/register       |Registrera ny användare       |
|POST       |auth/login       |Logga in med användare och lösenord       |
|GET       |/products       |Hämta produkter       |
|GET       |/products/:id       |Hämta produkt per ID       |
|POST       |/products       |Skapa ny produkt       |
|PUT       |/products/:id       |Uppdatera en produkt       |
|DELETE       |/products/:id       |Radera en produkt       |
|GET       |/categories       |Hämta alla kategorier       |
|GET       |/orders       |Hämta alla ordrar       |
|GET       |/orders/:id       |Hämta en specifik order per ID       |
|GET       |/orders/user/myorders       |Hämta nuvarande användares ordrar       |
|POST       |/orders       |Skapa en ny order       |
|PUT       |/orders/:id/status       |Uppdatera orderstatus       |
|PUT       |/orders/:id/cancel       |Avbryt order       |

```
Ansluten till API via [https://grupp-3.vercel.app/api/]
```
## Miljöer
### Deployment
**Frontend**
- [https://2405-g03-fe.vercel.app/]

**Backend**
- [https://webshop-2025-be-g1.vercel.app/]

### Production
**Frontend**
- V1: [https://github.com/johnnykly/2405_G03_FE/]
- V2: []
- fork source [https://github.com/Jonatan-Vahlberg-WAS/BE-Webshop-2025-FE]

**Backend**
- V1: [https://github.com/SandraLinnea/Grupp-3]
- fork source [https://github.com/Nackademin-BE-1-Admin/Webshop-2025-BE-G1]

**Website mockup**
- Figma [https://www.figma.com/design/NHNyjULjqwIqo7E0so7iwT/2405%3A-Hakim-Livs?node-id=0-1&t=rvliz4jTLEXBngk6-1]
- Figma (prototype) [https://www.figma.com/proto/NHNyjULjqwIqo7E0so7iwT/2405%3A-Hakim-Livs?node-id=0-1&t=rvliz4jTLEXBngk6-1]

### Development
**Frontend**
- http://localhost:5500

**Backend**
- http://localhost:3000

## Deployment 
```
- Vercel konto: Skapa ett Vercel-konto eller logga in på Vercel.
- Deploy till Vercel: Koppla Vercel till ditt GitHub-konto och välj repositoryn för att distribuera applikationen.
- Automatisk deploy: När du pushar nya ändringar till GitHub kommer applikationen automatiskt att uppdateras och distribueras på Vercel.

# Steg för steg info om hur man deployar hela siten till en ny server
- Frontend
1. Clone frontend repository
2. Skapa vercel-sida
3. Connecta github repo main branch med vercel
4. Pusha koden till main branch
5. Deploy vercel-sida
- Automatisk deploy: När du pushar nya ändringar till GitHub kommer applikationen automatiskt att uppdateras och distribueras på Vercel.
```

- Backend
Hänvisning till backend och readme.md
Ansök om åtkomst till admin

## Enkel vägledning för användning av siten

|Fil       |Beskrivning       |
|  ---  |  ---  |
|index.html       |Startsida för webbshop       |
|login.html       |Inloggningsida för användare och admin       |
|order.html       |Varukorgshantering och kassa för kund       |
|admin.html       |Admin-panel för att hantera produkter, kategorier, kunder och ordrar       |


## Hjälp-funktioner (t.ex för API-anrop) - Vilka funktioner kan/bör återanvändas genomgående i projektet, och vart hittar man dem?

### Funktioner 
src/utils/api.js

Detta är huvudfilen för alla API-anrop. Den innehåller autentisering via JWT, dynamisk URL-hantering och funktioner för CRUD-operationer.

Funktioner:
	•	getToken()
Hämtar JWT-token från sessionStorage.
	•	getBaseUrl()
Returnerar rätt bas-URL beroende på om projektet körs lokalt eller i produktion.
	•	fetchProducts()
Hämtar alla produkter från API:t.
	•	fetchCategories()
Hämtar alla produktkategorier från API:t.
	•	fetchUsers()
Hämtar användare (kräver admin-token).
	•	fetchOrders()
Hämtar ordrar (kräver admin-token).
	•	addProduct(productData)
Lägger till en ny produkt (POST).
	•	deleteProduct(productId)
Tar bort en produkt med givet ID (DELETE).
	•	fetchProductById(productId)
Hämtar en specifik produkt med ID.
	•	updateProduct(productId, productData)
Uppdaterar en produkt med nytt data (PUT).

---
detailModal.js

Används för att visa en detaljerad produktmodal när en användare klickar på ett produktkort.

Funktion:
	•	showProductDetailModal(productTitle)
Visar en modal med produktinformation baserat på titel. Hämtar produktdata från dummyProducts och skapar en DOM-struktur.
---
index.js

Hanterar startsidans dynamiska rendering av produkter och kategorier.

Återanvändbara funktioner:
	•	loadCategories()
Hämtar och renderar kategori-knappar.
	•	filterProductsByCategory(category)
Filtrerar produkter baserat på vald kategori.
	•	filterProductsBySearch(searchInput)
Filtrerar produkter baserat på sökfältets input.
	•	loadProducts(filteredProducts)
Renderar produktkort baserat på ett produkt-array.
	•	createProductCard(product)
Skapar ett DOM-element för ett enskilt produktkort, inklusive event handlers för kundvagnshantering.
---
order.js

Används på ordersidan för att visa kundens varukorg, fylla i formulärdata och skicka beställningar.

Innehåller:
	•	Formulärhantering med FormData
	•	Sammanställning av orderItems med kvantitet
	•	Beräkning av totalPrice
	•	Autofyll av formulär om användaren är inloggad
	•	POST-anrop till API:t för att lägga order
---
login.js

Hanterar login och registrering.

Funktionalitet:
	•	submit-event för login-formuläret
Skickar POST-anrop till /auth/login, sparar JWT-token + user i sessionStorage.
	•	submit-event för register-formuläret
Skickar POST-anrop till /auth/register.
	•	DOM-hantering för att växla mellan login och registreringsvyer.
---
admin.js

Den mest omfattande filen, ansvarig för adminpanelen. Innehåller dynamisk DOM-hantering för att visa, redigera, uppdatera och radera produkter, användare, ordrar och kategorier.

Återanvändbara funktioner:
	•	showSection(id)
Visar rätt innehållssektion i adminpanelen. Kan återanvändas för andra “single-page-style”-vyer.
	•	resetEditMode()
Återställer formuläret till standardläge. Bra för redigeringsformulär generellt.
	•	loadCategories()
(Separat från index.js!) Laddar kategorier till select-fält i formulär.
	•	loadProductList(), loadCustomerList(), loadOrderList(), loadCategoryList()
Async-funktioner som hämtar data från API:t och renderar det i tabeller.
	•	handleEditProduct(productId), handleDeleteProduct(productId)
Funktioner för att hantera redigering och radering av produkter.


### Testverktyg
- Postman
Testning av backend och 
- MongoDB


## Förbättringspunkter

### Functionality
- User token har mer användardata som kan användas för t.ex. autofyllning vid order
- Förbättring av presentation av varukorg med t.ex. antal, pris och summa.
- Refaktorering av vissa funktioner för att minska komplexiteten.
- Implementering av mer omfattande tester för API-rutter och funktionalitet.
- Implementering av API-funktioner i adminpanelen såsom hantering av kunder, ordrar och kategorier

### Performance
- Optimering av databasfrågor för bättre prestanda.

### Styling
- Förbättrat användargränssnitt av
    - Startsida
    - Produktsida
    - Inloggningssida
    - Sidomeny
    - Header
    - Footer