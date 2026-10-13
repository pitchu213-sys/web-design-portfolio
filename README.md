# Portfolio Web Design Showcase — 3 Concepts Fictifs

Projet de vitrine professionnelle conçu pour démontrer l'expertise en web design, direction artistique et ergonomie auprès de clients freelance potentiels.

---

## 🌟 Vue d'ensemble

Le projet regroupe une page d'accueil centrale élégante et trois concepts de sites indépendants, chacun disposant de sa propre identité visuelle, typographie, palette chromatique et mise en page :

1. **Maison Azur** (`/maison-azur`) : Maison d'hôtes de luxe sur la Côte d'Azur.
   - *Ambiance* : Luxe discret, solaire, minéral, calme maritime.
   - *Typographie* : Cormorant Garamond & Plus Jakarta Sans.
   - *Palette* : Bleu Azur (#081B29), Or calcaire (#C5A880), Pierre chaude (#F5F1EB).

2. **Maison du Goût** (`/maison-du-gout`) : Restaurant gastronomique & table d'auteur.
   - *Ambiance* : Feutrée, sensorielle, chaleur d'un dîner aux chandelles, sincérité du terroir.
   - *Typographie* : Playfair Display Italic & Plus Jakarta Sans.
   - *Palette* : Anthracite (#12100E), Terracotta (#892B1B), Ambre safran (#D97706).

3. **NOVA Industries** (`/nova-industries`) : Ingénierie industrielle de pointe & robotique modulaire.
   - *Ambiance* : Rigueur technique, haute précision, télémétrie, corporate B2B.
   - *Typographie* : Space Grotesk & JetBrains Mono.
   - *Palette* : Graphite sombre (#07090E), Bleu cobalt (#2563EB), Cyan électrique (#06B6D4).

> **Note importante** : Tous les concepts sont explicitement présentés comme des **créations fictives** à vocation de démonstration de design. Aucun faux client, faux avis ni faux résultats d'affaires n'ont été inventés.

---

## 🛠️ Architecture Technique & Légèreté

- **Zéro dépendance superflue** : Fonctionne directement avec le runtime performant Bun sans surcharge de packages ou de frameworks lourds.
- **Routage HTTP natif** : Le serveur `server.ts` dessert directement les 4 routes principales et les ressources statiques.
- **Feuilles de styles modulaires** :
  - `public/css/main.css` : Page d'accueil centrale du portfolio.
  - `public/css/maison-azur.css` : Style dédié à Maison Azur.
  - `public/css/maison-du-gout.css` : Style dédié à Maison du Goût.
  - `public/css/nova-industries.css` : Style dédié à NOVA Industries.
- **Navigation fluide** : Chaque concept est structuré en *single-page* avec menu d'ancres internes (`#accueil`, `#domaine`, `#carte`, `#expertises`, etc.) et bandeau transversal permettant de revenir à tout moment au portfolio central.

---

## 📁 Structure des fichiers

```text
web-design-portfolio/
├── package.json               # Définition du projet et scripts bun
├── server.ts                  # Serveur HTTP natif Bun (routage & statiques)
├── README.md                  # Documentation du projet
├── public/
│   ├── css/
│   │   ├── main.css           # Direction artistique du portfolio
│   │   ├── maison-azur.css    # Thème Maison Azur
│   │   ├── maison-du-gout.css # Thème Maison du Goût
│   │   └── nova-industries.css# Thème NOVA Industries
│   └── js/
│       └── app.js             # Interactions légères & scroll fluide
└── views/
    ├── index.html             # Page d'accueil centrale du portfolio
    ├── maison-azur.html       # Concept 1 : Maison Azur
    ├── maison-du-gout.html    # Concept 2 : Maison du Goût
    └── nova-industries.html   # Concept 3 : NOVA Industries
```

---

## 🚀 Démarrage de l'application

### Prérequis
- [Bun](https://bun.sh/) (déjà configuré sur le système)

### Lancement en mode développement
Dans le dossier du projet :
```powershell
bun dev
```

### Lancement en mode normal
```powershell
bun start
```

Le serveur sera disponible sur :
**[http://localhost:3000](http://localhost:3000)**

### Routes disponibles
- `/` : Accueil du portfolio vitrine
- `/maison-azur` : Concept Maison Azur
- `/maison-du-gout` : Concept Maison du Goût
- `/nova-industries` : Concept NOVA Industries
