# Avancement à la Classe 1 — Zineddine Chergui

[![UQAM](https://img.shields.io/badge/UQAM-Service%20Audiovisuel-003366)](https://www.uqam.ca/)
[![Status](https://img.shields.io/badge/Status-Dossier%20Complet-success)](.)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](.)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](.)

> **Dossier de demande d'avancement à la classe 1** du corps d'emploi *Technicien en électronique* au sein du Service de l'audiovisuel de l'Université du Québec à Montréal (UQAM).

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Critères démontrés](#-critères-démontrés)
- [Projets présentés](#-projets-présentés)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités du site](#-fonctionnalités-du-site)
- [Installation](#-installation)
- [Technologies utilisées](#-technologies-utilisées)
- [Auteur](#-auteur)

---

## 🎯 Aperçu

Ce dossier présente ma demande d'avancement à la **classe 1** en démontrant l'atteinte des critères 1, 2 et 3 du référentiel institutionnel UQAM à travers deux projets majeurs développés de façon autonome :

| Projet | Description | Technologies |
|--------|-------------|--------------|
| **StockAV** | Application web de gestion de stock de composants électroniques | HTML5, CSS3, JS, Supabase, PostgreSQL, IA (Cohere/Gemini) |
| **Vitrine** | Système de diagnostic et signalement audiovisuel pour salles de cours | HTML5, CSS3, JS, API REST, PDF.js |

---

## ✅ Critères démontrés

### Critère 1 — Complexité des tâches
> Accomplir des tâches complexes nécessitant des connaissances approfondies dans son domaine.

- Conception d'architectures multi-couches (Frontend SPA, Backend Supabase, PostgreSQL)
- Intégration d'APIs d'intelligence artificielle (Cohere, Google Gemini)
- Développement de systèmes de transactions atomiques avec traçabilité complète

### Critère 2 — Autonomie
> Faire preuve d'autonomie dans l'accomplissement de ses tâches.

- Conception, développement et déploiement autonome de deux applications complètes
- Prise de décisions techniques indépendantes (choix d'architecture, technologies)
- Gestion complète du cycle de vie des projets sans supervision directe

### Critère 3 — Amélioration des méthodes
> Contribuer à l'amélioration des méthodes de travail de son unité.

- Création d'outils réduisant significativement le temps de traitement des demandes
- Documentation technique complète pour transfert de connaissances
- Standardisation des processus de diagnostic et de gestion de stock

---

## 🚀 Projets présentés

### StockAV — Gestion de stock intelligente

Application web complète permettant la gestion de l'inventaire des composants électroniques du Service de l'audiovisuel.

**Fonctionnalités principales :**
- 🔍 **Recherche IA** — Conversation intelligente pour trouver des équivalents techniques
- 📦 **Inventaire** — Gestion complète avec filtres, catégories et attributs personnalisés
- 🛒 **Kit de prélèvement** — Liste de composants à récupérer avec indication des tiroirs
- 📊 **Historique** — Traçabilité complète des mouvements de stock
- ⚙️ **Administration** — Gestion des catégories, attributs et utilisateurs
- 📤 **Import/Export** — CSV et TXT avec modes enrichir ou écraser

**Captures d'écran :**

| Interface | Description |
|-----------|-------------|
| ![StockAV-01](assets/stockav/stockav-01.jpeg) | Recherche IA avec équivalents |
| ![StockAV-02](assets/stockav/stockav-02.jpeg) | Modal de modification de stock |
| ![StockAV-03](assets/stockav/stockav-03.jpeg) | Kit de prélèvement |

---

### Vitrine — Diagnostic audiovisuel

Système de diagnostic interactif et de signalement pour les salles de cours équipées.

**Fonctionnalités principales :**
- 🖥️ **Diagnostic interactif** — Interface guidée pour identifier les problèmes AV
- 🔧 **Corrections automatiques** — Tentatives de résolution sans intervention
- 📞 **Création de tickets** — Intégration avec le système SEA (#6135)
- 🔐 **Mode technicien** — Accès protégé aux plans unifilaires et documentation
- 📄 **Plans PDF** — Visualisation des schémas techniques par salle

**Captures d'écran :**

| Interface | Description |
|-----------|-------------|
| ![Vitrine-01](assets/vitrine/vitrine-01.jpeg) | Interface de diagnostic |
| ![Vitrine-03](assets/vitrine/vitrine-03.jpeg) | Création de ticket |
| ![Vitrine-07](assets/vitrine/vitrine-07.jpeg) | Mode technique |

---

## 📁 Structure du projet

```
classe1/
├── index.html              # Page principale du dossier
├── styles.css              # Feuille de styles (responsive + print)
├── app.js                  # JavaScript (navigation, lightbox, recherche)
├── README.md               # Ce fichier
├── Avancement_ClasseI_Zineddine_Chergui.docx   # Dossier Word officiel
├── AvancementClasseI.pdf   # Version PDF du dossier
├── Avancement_Classe1_StockAV.md              # Documentation technique StockAV
├── HANDOVER_VITRINE.md     # Documentation technique Vitrine
└── assets/
    ├── stockav/            # Captures d'écran StockAV (7 images)
    │   ├── stockav-01.jpeg
    │   ├── stockav-02.jpeg
    │   ├── stockav-03.jpeg
    │   ├── stockav-04.jpeg
    │   ├── stockav-05.jpeg
    │   ├── stockav-06.jpeg
    │   └── stockav-07.jpeg
    └── vitrine/            # Captures d'écran Vitrine (7 images)
        ├── vitrine-01.jpeg
        ├── vitrine-02.jpeg
        ├── vitrine-03.jpeg
        ├── vitrine-04.jpeg
        ├── vitrine-05.jpeg
        ├── vitrine-06.jpeg
        └── vitrine-07.jpeg
```

---

## ✨ Fonctionnalités du site

Le site web de présentation offre :

- 📑 **Navigation sticky** — Table des matières toujours visible
- 🔍 **Recherche** — Filtrage en temps réel des sections
- 🖼️ **Lightbox** — Zoom sur les images avec navigation galerie
- 📱 **Responsive** — Adapté mobile, tablette et desktop
- 🖨️ **Print-friendly** — Export PDF optimisé
- ♿ **Accessible** — WCAG AA, navigation clavier, ARIA

---

## 💻 Installation

Aucune installation requise ! Il s'agit d'un site statique.

```bash
# Cloner le repository
git clone https://github.com/Zine76/classe1.git

# Ouvrir dans le navigateur
# Double-cliquer sur index.html
# ou utiliser un serveur local :
npx serve .
```

---

## 🛠️ Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Design** | CSS Grid, Flexbox, CSS Variables |
| **Accessibilité** | ARIA, Semantic HTML, Skip links |
| **Responsive** | Media queries, Mobile-first |
| **Print** | @media print optimisé |

---

## 👤 Auteur

**Zineddine Chergui**  
*Technicien en électronique*  
Service de l'audiovisuel — UQAM

---

## 📄 Licence

Ce projet est destiné à un usage interne UQAM dans le cadre d'une demande d'avancement de classe.

---

<p align="center">
  <em>Décembre 2025 — Version 1.0</em>
</p>

