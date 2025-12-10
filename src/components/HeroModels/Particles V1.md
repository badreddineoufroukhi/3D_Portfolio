# Particles.jsx

## Description

`Particles` est un composant Three.js qui crée un système de particules animées tombant comme de la neige ou de la pluie. Les particules se déplacent de haut en bas de manière continue, créant un effet visuel dynamique et atmosphérique.

## Dépendances

```javascript
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
```

## Props

```javascript
<Particles count={200} />
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `count` | number | 200 | Nombre total de particules à générer |

## Fonctionnement

### 1. Génération des particules (useMemo)

```javascript
const particles = useMemo(() => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      position: [
        (Math.random() - 0.5) * 10,  // X: -5 à +5
        Math.random() * 10 + 5,       // Y: 5 à 15 (point de départ haut)
        (Math.random() - 0.5) * 10,  // Z: -5 à +5
      ],
      speed: 0.01 + Math.random() * 0.001, // Vitesse variable
    });
  }
  return temp;
}, [count]);
```

**Caractéristiques des particules :**
- **Position X** : Aléatoire entre -5 et +5 unités
- **Position Y** : Commence entre 5 et 15 unités de hauteur
- **Position Z** : Aléatoire entre -5 et +5 unités
- **Vitesse** : Entre 0.01 et 0.011 unités par frame (variation subtile)

**useMemo** : Les particules ne sont recalculées que si `count` change, optimisant les performances.

### 2. Animation (useFrame)

```javascript
useFrame(() => {
  const positions = mesh.current.geometry.attributes.position.array;
  for (let i = 0; i < count; i++) {
    let y = positions[i * 3 + 1]; // Récupère position Y
    y -= particles[i].speed;       // Fait descendre la particule
    if (y < -2) y = Math.random() * 10 + 5; // Réinitialise en haut
    positions[i * 3 + 1] = y;      // Met à jour position Y
  }
  mesh.current.geometry.attributes.position.needsUpdate = true;
});
```

**Logique d'animation :**
1. À chaque frame, parcourt toutes les particules
2. Réduit la position Y selon la vitesse de la particule
3. Si la particule tombe sous Y = -2, elle réapparaît en haut (Y entre 5 et 15)
4. Marque la géométrie comme devant être mise à jour

**Structure du tableau positions :**
```
[x1, y1, z1, x2, y2, z2, x3, y3, z3, ...]
 ↑       ↑       ↑       ↑       ↑       ↑
 Index:  0   1   2   3   4   5   6   7   8
```
- Pour accéder à Y de la particule i : `positions[i * 3 + 1]`

### 3. Initialisation des positions

```javascript
const positions = new Float32Array(count * 3);
particles.forEach((p, i) => {
  positions[i * 3] = p.position[0];     // X
  positions[i * 3 + 1] = p.position[1]; // Y
  positions[i * 3 + 2] = p.position[2]; // Z
});
```

Crée un tableau optimisé (Float32Array) contenant les positions initiales de toutes les particules.

## Rendu Three.js

### Structure

```javascript
<points ref={mesh}>
  <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      count={count}
      array={positions}
      itemSize={3}
    />
  </bufferGeometry>
  <pointsMaterial
    color="#ffffff"
    size={0.05}
    transparent
    opacity={0.9}
    depthWrite={false}
  />
</points>
```

### Points

Objet Three.js spécial pour rendre efficacement un grand nombre de particules.

### BufferGeometry

Définit la géométrie des particules avec un `bufferAttribute` pour les positions :
- `attach="attributes-position"` : Définit l'attribut de position
- `count` : Nombre de particules
- `array` : Tableau des positions (Float32Array)
- `itemSize={3}` : Chaque position contient 3 valeurs (x, y, z)

### PointsMaterial

Définit l'apparence des particules :

| Propriété | Valeur | Description |
|-----------|--------|-------------|
| `color` | "#ffffff" | Blanc |
| `size` | 0.05 | Taille de chaque particule (très petite) |
| `transparent` | true | Active la transparence |
| `opacity` | 0.9 | 90% opaque |
| `depthWrite` | false | Évite les problèmes de tri avec d'autres objets transparents |

## Optimisations

1. **useMemo** : Les données de particules ne sont générées qu'une fois
2. **Float32Array** : Tableau typé optimisé pour WebGL
3. **BufferGeometry** : Plus performant que Geometry classique
4. **Points** : Rendu GPU optimisé pour de nombreuses particules
5. **Mise à jour ciblée** : Seule la position Y est recalculée chaque frame

## Utilisation

```javascript
import Particles from "./Particles"

function Scene() {
  return (
    <Canvas>
      <Particles count={500} />
      {/* Autres éléments de la scène */}
    </Canvas>
  )
}
```

### Exemples de configuration

```javascript
// Peu de particules lentes (effet neige légère)
<Particles count={100} />

// Beaucoup de particules (effet neige dense)
<Particles count={1000} />

// Configuration par défaut (effet équilibré)
<Particles />
```

## Diagramme de flux

```
┌─────────────────────────────────────┐
│  Initialisation (useMemo)           │
│  - Génère 'count' particules        │
│  - Position aléatoire (Y: 5-15)     │
│  - Vitesse aléatoire (0.01-0.011)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Chaque Frame (useFrame)            │
│  ┌───────────────────────────────┐  │
│  │ Pour chaque particule:        │  │
│  │  1. y -= speed                │  │
│  │  2. Si y < -2: y = random(5-15) │
│  │  3. Mettre à jour position    │  │
│  └───────────────────────────────┘  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Rendu (GPU)                        │
│  - Points blancs semi-transparents  │
│  - Taille: 0.05 unités             │
└─────────────────────────────────────┘
```

## Notes techniques

### Performance

- **Recommandé** : 100-1000 particules pour un bon compromis visuel/performance
- **Maximum testé** : Jusqu'à 5000 particules sur du matériel moderne
- Le coût principal est le calcul CPU dans `useFrame`, pas le rendu GPU

### Personnalisation possible

Pour modifier l'apparence, ajustez le `pointsMaterial` :

```javascript
// Particules bleues plus grandes
<pointsMaterial
  color="#00bfff"
  size={0.1}
  transparent
  opacity={0.7}
/>

// Effet de scintillement (nécessite un shader personnalisé)
// Ou variez l'opacité dans useFrame
```

### Zone de chute

```
        Y = 15 ─────────  Réinitialisation (haut)
                   ↑
                   │ Zone de génération aléatoire
                   ↓
        Y = 5  ─────────  Point de départ minimum
        
        Y = 0  ─────────  Niveau de la scène
        
        Y = -2 ─────────  Seuil de réinitialisation (bas)
```

### Intégration avec la scène Room

Dans `HeroExperience.jsx`, les particules sont ajoutées avant le groupe Room :

```javascript
<Particles count={500} />
<group position={[0, -4, 0]}>
  <Room/>
</group>
```

Cela crée un effet de particules tombant autour et à travers la scène 3D.