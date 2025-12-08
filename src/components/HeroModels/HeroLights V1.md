# HeroLights.jsx

## Description

`HeroLights` configure l'ensemble de l'éclairage de la scène 3D du hero. Il combine plusieurs types de lumières (spotlights, area lights, point lights) pour créer une atmosphère moody et stylisée avec des teintes violettes et bleues.

## Dépendances

```javascript
import * as THREE from "three"
```

## Configuration des lumières

### 1. SpotLight principale - Lampe

```javascript
<spotLight
  position={[2, 2, -1]}
  angle={0.2}
  penumbra={0.5}
  intensity={85}
  color="white"
/>
```

**Paramètres :**
- `position`: [2, 2, -1] - Positionnée en haut à droite, légèrement en arrière
- `angle`: 0.2 rad (~11.5°) - Faisceau étroit
- `penumbra`: 0.5 - Transition moyenne entre lumière et ombre
- `intensity`: 85 - Très forte intensité (lumière principale)
- `color`: Blanc - Lumière neutre

**Rôle :** Simule la lampe de bureau dans la scène, éclairage principal.

### 2. SpotLight d'ambiance - Lampe overhead

```javascript
<spotLight
  position={[2, 2, -1]}
  angle={0.4}
  penumbra={0.8}
  intensity={10}
  color="white"
/>
```

**Paramètres :**
- `position`: [2, 2, -1] - Même position que la lampe principale
- `angle`: 0.4 rad (~23°) - Faisceau plus large
- `penumbra`: 0.8 - Transition douce
- `intensity`: 10 - Faible intensité
- `color`: Blanc

**Rôle :** Ajoute une couche d'éclairage doux et diffus pour compléter la lampe principale.

### 3. SpotLight latérale - Fill light violet

```javascript
<spotLight
  position={[3, 4, 2]}
  angle={0.4}
  penumbra={1}
  intensity={60}
  color="#9d4edd"
/>
```

**Paramètres :**
- `position`: [3, 4, 2] - En hauteur, côté droit, en avant
- `angle`: 0.4 rad (~23°)
- `penumbra`: 1 - Transition très douce (maximum)
- `intensity`: 60 - Forte intensité
- `color`: #9d4edd - Violet clair/pourpre

**Rôle :** Fill light créant une ambiance colorée, éclaire les zones d'ombre avec une teinte violette.

### 4. RectAreaLight - Lumière d'ambiance moody

```javascript
<primitive
  object={new THREE.RectAreaLight("#a259ff", 8, 3, 2)}
  position={[2, 3, 1]}
  rotation={[-Math.PI / 4, Math.PI / 4, 0]}
  intensity={1}
/>
```

**Paramètres :**
- `color`: #a259ff - Violet/magenta
- Dimensions: 8 (intensité) × 3 (largeur) × 2 (hauteur)
- `position`: [2, 3, 1] - En hauteur, côté droit
- `rotation`: [-45°, 45°, 0] - Orientée en diagonale
- `intensity`: 1

**Rôle :** Crée un éclairage doux et diffus pour une ambiance moody. Simule une source de lumière rectangulaire (comme un panneau LED).

### 5. PointLight #1 - Ton atmosphérique

```javascript
<pointLight 
  position={[0, 1, 0]} 
  intensity={10} 
  color="#7209b7" 
/>
```

**Paramètres :**
- `position`: [0, 1, 0] - Centre de la scène, légèrement en hauteur
- `intensity`: 10
- `color`: #7209b7 - Violet foncé/royal

**Rôle :** Éclairage omnidirectionnel subtil pour enrichir l'atmosphère violette.

### 6. PointLight #2 - Accent bleu foncé

```javascript
<pointLight 
  position={[1, 2, -2]} 
  intensity={10} 
  color="#0d00a4" 
/>
```

**Paramètres :**
- `position`: [1, 2, -2] - Légèrement à droite, en hauteur, en arrière
- `intensity`: 10
- `color`: #0d00a4 - Bleu très foncé/indigo

**Rôle :** Ajoute une touche de contraste bleu pour enrichir la palette de couleurs.

## Palette de couleurs

L'éclairage crée une ambiance avec ces teintes :

- **Blanc** : Éclairage principal neutre
- **#9d4edd** : Violet clair/pourpre
- **#a259ff** : Violet/magenta
- **#7209b7** : Violet royal
- **#0d00a4** : Bleu indigo foncé

## Schéma d'éclairage

```
Vue de dessus approximative :

        [PointLight #2]
            (bleu)
               ↓
    
    [RectAreaLight]     [Spotlights x2]
      (violet)              (blanc)
         ↓                     ↓
         
         ╔════════════╗
         ║   SCÈNE    ║  ← [SpotLight fill] (violet)
         ║   (Room)   ║
         ╚════════════╝
              ↑
        [PointLight #1]
           (violet)
```

## Utilisation

```javascript
import HeroLights from "./HeroLights"

function Scene() {
  return (
    <Canvas>
      <HeroLights />
      <Room />
    </Canvas>
  )
}
```

## Notes techniques

- **3 SpotLights** : Éclairage directionnel avec contrôle précis
- **1 RectAreaLight** : Éclairage surfacique doux (plus réaliste mais plus coûteux)
- **2 PointLights** : Éclairage omnidirectionnel pour l'ambiance

### Performance

- Les RectAreaLights sont plus coûteuses en performance que les autres types
- Total de 6 sources lumineuses : configuration riche mais optimisée pour une seule scène

### Style visuel

L'éclairage crée une ambiance **cyberpunk/futuriste moody** avec :
- Un éclairage principal blanc fort (lampe de bureau)
- Des accents violets et bleus pour une ambiance nocturne
- Des transitions douces (penumbra élevée) pour un rendu cinématographique