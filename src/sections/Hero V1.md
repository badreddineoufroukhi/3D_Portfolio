# Explication du composant Hero.jsx

## Vue d'ensemble
Le composant `Hero` représente la section d'accueil principale du portfolio. C'est la première section que l'utilisateur voit en arrivant sur le site.

## Structure du composant

### 1. Imports
```javascript
import Button from "../components/Button";
import { words } from "../constants";
```
- **Button** : Composant personnalisé pour le bouton d'appel à l'action
- **words** : Tableau de données contenant les mots animés avec leurs icônes

### 2. Section principale
```javascript
<section id="hero" className="relative overflow-hidden">
```
- **id="hero"** : Identifiant pour la navigation (ancre)
- **relative** : Positionnement relatif pour les éléments absolus enfants
- **overflow-hidden** : Cache les débordements pour l'effet visuel

### 3. Image de fond
```javascript
<div className="absolute top-0 left-0 z-10">
  <img src="/images/bg.png" alt="" />
</div>
```
- Image décorative positionnée en arrière-plan
- **z-10** : Contrôle l'ordre d'empilement des éléments

### 4. Contenu principal (hero-layout)

#### Titre avec animation de texte
```javascript
<div className="hero-text">
  <h1>
    Shaping
    <span className="slide">
      <span className="wrapper">
        {words.map((word) => (...))}
      </span>
    </span>
  </h1>
  <h1>into Reliable</h1>
  <h1>High-Impact Solutions</h1>
</div>
```

**Fonctionnement de l'animation** :
- `words.map()` : Boucle sur le tableau de mots importé
- Chaque mot s'affiche avec son icône associée
- L'animation CSS (keyframes `wordSlider`) fait défiler les mots verticalement
- Le texte complet devient : "Shaping [Mot animé] into Reliable High-Impact Solutions"

**Structure de chaque mot** :
```javascript
<span className="flex items-center md:gap-3 gap-1 pb-2">
  <img src={word.imgPath} alt="person" />
  <span>{word.text}</span>
</span>
```
- Icône circulaire à gauche
- Texte du mot à droite
- Responsive : écart adaptatif selon la taille d'écran

#### Description
```javascript
<p className="text-white-50 md:text-xl">
  Hi, I'm Badr Eddine, a Full-Stack Software Engineer from Morocco...
</p>
```
- Texte de présentation personnelle
- Couleur claire (white-50)
- Taille responsive

#### Bouton d'action
```javascript
<Button
  text="See My Work"
  className="md:w-80 md:h-16 w-60 h-12"
  id="button"
/>
```
- Appel du composant Button personnalisé
- Dimensions responsive (mobile vs desktop)
- Texte : "See My Work"

## Responsive Design

### Mobile (< 768px)
- Padding réduit : `px-5`
- Texte plus petit : `text-[30px]`
- Bouton plus petit : `w-60 h-12`
- Espacement réduit : `gap-1`

### Desktop (≥ 768px)
- Padding large : `md:px-20`
- Texte plus grand : `md:text-[60px]`
- Bouton plus grand : `md:w-80 md:h-16`
- Espacement large : `md:gap-3`

## Classes CSS utilisées

### Classes Tailwind
- **Flexbox** : `flex`, `flex-col`, `justify-center`, `items-center`
- **Espacement** : `gap-7`, `pb-2`, `px-5`, `md:px-20`
- **Dimensions** : `w-screen`, `md:w-full`
- **Typographie** : `text-xl`, `md:text-[60px]`, `font-semibold`
- **Couleurs** : `text-white-50`, `bg-white-50`

### Classes personnalisées (index.css)
- **hero-layout** : Disposition générale de la section
- **hero-text** : Styles du titre principal
- **slide** : Conteneur de l'animation
- **wrapper** : Wrapper pour les mots animés

## Animation des mots

L'animation fonctionne avec trois niveaux :

1. **CSS (index.css)** :
   - `@keyframes wordSlider` : Définit les étapes de l'animation
   - Durée : 21 secondes
   - Effet : Translation verticale progressive

2. **HTML Structure** :
   - `.slide` : Conteneur avec overflow hidden
   - `.wrapper` : Élément qui se translate verticalement
   - Liste de mots : Empilés verticalement

3. **JavaScript** :
   - `words.map()` : Génère dynamiquement les éléments
   - Données depuis constants/index.js

## Points clés

✅ **Composant stateless** : Pas de state, uniquement du rendu
✅ **Responsive** : S'adapte aux différentes tailles d'écran
✅ **Animation fluide** : Rotation automatique des mots
✅ **Réutilisable** : Facile à modifier via le fichier constants
✅ **Accessible** : Structure sémantique (section, header, h1, p)