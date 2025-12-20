# ShowcaseSection.jsx - Documentation

## C'est quoi ?

Un composant React qui affiche un portfolio de 3 projets avec des animations au scroll. C'est la section "Mes projets" du site.

## Librairies utilisées

- **GSAP** : Bibliothèque pour créer des animations fluides et professionnelles
- **ScrollTrigger** : Plugin GSAP qui déclenche les animations quand on scroll
- **useRef** : Hook React pour cibler les éléments à animer
- **useGSAP** : Hook spécial qui connecte GSAP avec React

## Comment fonctionnent les animations ?

### 1. Animation de la section (au chargement)
```javascript
gsap.fromTo(sectionRef.current,
  { opacity: 0 },        // État de départ : invisible
  { opacity: 1, duration: 1.5 }  // État final : visible en 1.5s
);
```

### 2. Animation des projets (au scroll)

Chaque projet a la même animation :
- **Départ** : 50px plus bas et invisible
- **Arrivée** : Position normale et visible
- **Durée** : 1 seconde
- **Délai** : Projet 1 (0.3s), Projet 2 (0.6s), Projet 3 (0.9s)
- **Déclenchement** : Quand le projet entre dans la fenêtre (100px avant)

Résultat : Les projets apparaissent un par un en montant, comme une cascade.

## Les 3 projets affichés

### Projet 1 - Ryde (projet principal)
- **Description** : Application de réservation de courses
- **Technologies** : React Native, Expo, TailwindCSS
- **Image** : `/images/project1.png`
- **Taille** : Plus grand que les autres (60% sur ordinateur)

### Projet 2 - Library Management
- **Description** : Plateforme de gestion de bibliothèque
- **Image** : `/images/project2.png`
- **Fond** : Beige clair (#FFEFDB)

### Projet 3 - YC Directory
- **Description** : Application de présentation de startups
- **Image** : `/images/project3.png`
- **Fond** : Rose pâle (#FFE7EB)

## Design responsive (mobile vs ordinateur)

### Sur mobile 📱
- Les 3 projets sont empilés verticalement (un en dessous de l'autre)
- Chaque projet prend toute la largeur de l'écran

### Sur tablette 
- Le projet 1 reste en haut
- Les projets 2 et 3 se mettent côte à côte

### Sur ordinateur 💻
- Le projet 1 prend 60% de l'écran à gauche
- Les projets 2 et 3 prennent 40% à droite (empilés verticalement)

## Structure du code

Le composant utilise 4 références (`useRef`) :
- `sectionRef` : Pour la section complète
- `project1Ref` : Pour le premier projet
- `project2Ref` : Pour le deuxième projet
- `project3Ref` : Pour le troisième projet

Ces références permettent à GSAP de cibler et animer les éléments du DOM.

## Classes CSS importantes

### `.app-showcase`
Container principal de toute la section
- **Padding** : 
  - Mobile : `20px` (px-5)
  - Desktop : `80px` (px-20)
- **Marges** : `80px` en haut (mt-20)
- **Layout** : Flexbox centré
- **Fonction** : Créer l'espace autour de tout le contenu

### `.showcaselayout`
Gère l'organisation des projets
- **Mobile** : `flex-direction: column` (tout empilé)
- **Desktop (XL)** : `flex-direction: row` (côte à côte)
- **Gap** : `40px` d'espacement entre les éléments
- **Fonction** : Passer d'un layout vertical à horizontal selon l'écran

### `.first-project-wrapper`
Container du projet principal (Ryde)
- **Largeur** :
  - Mobile : `100%`
  - Desktop (XL) : `60%`
- **Layout** : Flexbox vertical avec `space-between`
- **Contenu** : Image en haut, texte en bas
- **Fonction** : Donner plus d'importance au projet principal

### `.project-list-wrapper`
Container des 2 projets secondaires
- **Largeur** :
  - Mobile : `100%`
  - Desktop (XL) : `40%`
- **Direction** :
  - Mobile : Colonne verticale
  - Tablette (MD) : Ligne horizontale
  - Desktop (XL) : Retour en colonne verticale
- **Gap** : `40px` entre les 2 projets
- **Fonction** : Organiser les projets secondaires selon l'écran

### `.image-wrapper`
Container de chaque image de projet
- **Hauteurs adaptatives** :
  - Mobile : `256px` (h-64)
  - Tablette (MD) : `208px` (h-52) ou `288px` (h-72)
  - Desktop (XL) : `37vh` (37% de la hauteur de l'écran)
- **Position** : Relative pour positionner l'image
- **Border-radius** : `12px` pour les coins arrondis
- **Padding** : Variable selon la taille (plus grand sur XL)
- **Fonction** : S'adapter à toutes les tailles d'écran

### `.text-content`
Zone de texte du projet principal
- **Espacement** : `20px` entre les éléments (space-y-5)
- **Marge** : `20px` en haut (mt-5)
- **Contenu** : Titre (h2) et description (p)
- **Fonction** : Organiser le texte sous l'image principale