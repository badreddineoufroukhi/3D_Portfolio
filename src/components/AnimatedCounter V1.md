# AnimatedCounter.jsx

## Description

`AnimatedCounter` est un composant qui affiche des statistiques animées sous forme de compteurs qui s'incrémentent automatiquement de 0 jusqu'à leur valeur cible. Il utilise la bibliothèque `react-countup` pour créer des animations fluides et engageantes.

## Dépendances

```javascript
import { counterItems } from "../constants/index"
import CountUp from "react-countup"
```

## Structure des données (counterItems)

Les données proviennent du fichier `constants/index.js` et suivent cette structure :

```javascript
// Exemple de structure attendue
const counterItems = [
  {
    value: 100,      // Valeur finale du compteur
    suffix: "+",     // Suffixe à ajouter (ex: "+", "K", "%")
    label: "Projects Completed" // Description
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients"
  },
  // ...
];
```

## Composant

### Structure HTML/JSX

```javascript
<div id="counter" className="padding-x-lg xl:mt-0 mt-32">
  <div className="mx-auto grid-4-cols">
    {/* Cartes de compteurs */}
  </div>
</div>
```

### Classes CSS personnalisées

- **`padding-x-lg`** : Padding horizontal responsive (voir index.css)
  - Mobile : `px-5`
  - Desktop : `px-20`

- **`grid-4-cols`** : Grille responsive (voir index.css)
  - Mobile : 1 colonne
  - Tablette : 2 colonnes
  - Desktop (XL) : 4 colonnes
  - Gap de 7 unités entre les éléments

- **`xl:mt-0 mt-32`** : Marge supérieure
  - XL et plus : Aucune marge
  - Moins de XL : Marge de 32 unités

### Carte individuelle

```javascript
<div className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
  <div className="counter-number text-white-50 text-5xl font-bold mb-2">
    <CountUp end={item.value} duration={2} suffix={item.suffix} />
  </div>
  <div className="text-white-50 text-lg">{item.label}</div>
</div>
```

**Style de la carte :**
- `bg-zinc-900` : Fond gris très foncé
- `rounded-lg` : Bordures arrondies
- `p-10` : Padding interne de 10 unités
- `flex flex-col justify-center` : Disposition verticale centrée

## CountUp Component

### Props utilisées

```javascript
<CountUp 
  end={item.value}    // Valeur finale
  duration={2}        // Durée de l'animation en secondes
  suffix={item.suffix} // Texte à ajouter après le nombre
/>
```

### Propriétés CountUp

| Prop | Valeur | Description |
|------|--------|-------------|
| `end` | `item.value` | Valeur cible du compteur |
| `duration` | `2` | Animation de 2 secondes |
| `suffix` | `item.suffix` | Ajouté après le nombre (ex: "+", "K") |

### Autres props disponibles (non utilisées)

```javascript
// Props optionnelles de CountUp
<CountUp 
  start={0}           // Valeur de départ (défaut: 0)
  end={100}
  duration={2}
  decimals={0}        // Nombre de décimales
  prefix=""           // Texte avant le nombre
  suffix="+"
  separator=","       // Séparateur de milliers
  decimal="."         // Séparateur décimal
  onEnd={() => {}}    // Callback à la fin
  enableScrollSpy     // Démarre au scroll
  scrollSpyOnce       // Animation une seule fois
/>
```

## Style des nombres

```javascript
className="counter-number text-white-50 text-5xl font-bold mb-2"
```

- **`text-white-50`** : Couleur personnalisée (#d9ecff - voir theme dans index.css)
- **`text-5xl`** : Taille de texte très grande (Tailwind)
- **`font-bold`** : Graisse épaisse
- **`mb-2`** : Marge inférieure de 2 unités

## Style des labels

```javascript
className="text-white-50 text-lg"
```

- **`text-white-50`** : Même couleur que le nombre
- **`text-lg`** : Taille de texte large

## Utilisation dans Hero.jsx

```javascript
import AnimatedCounter from "../components/AnimatedCounter"

const Hero = () => {
  return (
    <section id="hero">
      {/* Contenu du hero */}
      <AnimatedCounter />
    </section>
  )
}
```

Le composant est placé à la fin de la section hero, accessible via le bouton "See My Work" qui scroll jusqu'à `#counter`.

## Exemple de données

```javascript
// constants/index.js
export const counterItems = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Completed"
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients"
  },
  {
    value: 5,
    suffix: "Y",
    label: "Years Experience"
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction"
  }
];
```

## Rendu visuel

```
┌─────────────────────────────────────────────────────────────┐
│                      AnimatedCounter                        │
├──────────────┬──────────────┬──────────────┬───────────────┤
│  ┌────────┐  │  ┌────────┐  │  ┌────────┐  │  ┌────────┐   │
│  │ 150+   │  │  │  50+   │  │  │   5Y   │  │  │  98%   │   │
│  │ Projects│ │  │ Happy  │  │  │ Years  │  │  │ Client │   │
│  │Completed│ │  │ Clients│  │  │Experien│  │  │Satisfa │   │
│  │        │  │  │        │  │  │   ce   │  │  │ ction  │   │
│  └────────┘  │  └────────┘  │  └────────┘  │  └────────┘   │
└──────────────┴──────────────┴──────────────┴───────────────┘
     Mobile: 1 colonne verticale
     Tablet: 2 colonnes × 2 lignes
     Desktop XL: 4 colonnes horizontales
```

## Animation

### Comportement

1. **Au chargement de la page** : Les compteurs commencent à 0
2. **Animation** : Incrémentation progressive pendant 2 secondes
3. **Fin** : Affichage stable de la valeur finale avec suffixe

### Timeline d'animation

```
0s                    1s                    2s
│─────────────────────┼─────────────────────│
0                    75                   150+
│                     │                     │
└─ Début              └─ Mi-parcours       └─ Fin (valeur finale)
```

### Easing

CountUp utilise un easing par défaut (ease-out) qui :
- Démarre rapidement
- Ralentit progressivement
- Donne une sensation naturelle

## Intégration avec Button.jsx

Le bouton "See My Work" dans Hero.jsx scroll vers ce composant :

```javascript
// Button.jsx
const target = document.getElementById("counter");
const offset = window.innerHeight * 0.15;
const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

window.scrollTo({
  top,
  behavior: "smooth",
});
```

Le scroll s'arrête avec un offset de 15% de la hauteur de l'écran au-dessus du compteur.

## Responsive Design

### Mobile (< 768px)
```css
.grid-4-cols → grid-cols-1
.padding-x-lg → px-5
.mt-32 → margin-top: 8rem
```

### Tablette (768px - 1279px)
```css
.grid-4-cols → grid-cols-2
.padding-x-lg → px-20
.mt-32 → margin-top: 8rem
```

### Desktop XL (≥ 1280px)
```css
.grid-4-cols → grid-cols-4
.padding-x-lg → px-20
.mt-0 → margin-top: 0
```

## Personnalisation

### Changer la durée d'animation

```javascript
<CountUp end={item.value} duration={3} suffix={item.suffix} />
//                                   ↑ 3 secondes au lieu de 2
```

### Ajouter un préfixe

```javascript
<CountUp 
  end={item.value} 
  duration={2} 
  prefix="$"        // Ajoute $ avant le nombre
  suffix={item.suffix} 
/>
// Résultat: $150+
```

### Ajouter des séparateurs de milliers

```javascript
<CountUp 
  end={1500} 
  duration={2} 
  separator=","     // Ajoute des virgules
  suffix="+" 
/>
// Résultat: 1,500+
```

### Animation au scroll (ScrollSpy)

```javascript
<CountUp 
  end={item.value} 
  duration={2} 
  suffix={item.suffix}
  enableScrollSpy={true}    // Démarre quand visible
  scrollSpyOnce={true}      // Animation une seule fois
/>
```

## Notes techniques

- **Performance** : CountUp est optimisé et n'impacte pas les performances
- **Accessibilité** : Les nombres sont lisibles par les lecteurs d'écran
- **SEO** : Les valeurs finales sont présentes dans le DOM
- **Animation fluide** : Utilise requestAnimationFrame pour des animations 60fps

## Problèmes potentiels

### Key manquante (warning actuel)

```javascript
// ❌ Problème actuel
<div className="bg-zinc-900...">

// ✅ Solution
<div key={item.label} className="bg-zinc-900...">
```

Le warning indique qu'il faut ajouter une `key` unique sur l'élément mappé.