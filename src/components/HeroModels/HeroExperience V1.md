# HeroExperience.jsx

## Description

`HeroExperience` est le composant principal qui configure la scène 3D du hero. Il gère le Canvas Three.js, les contrôles d'orbite et orchestre l'affichage de la pièce 3D avec son éclairage.

## Dépendances

```javascript
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import { Room } from "./Room"
import HeroLights from "./HeroLights"
```

## Structure du composant

### Gestion responsive

Le composant utilise `react-responsive` pour adapter l'affichage selon la taille de l'écran :

- **isMobile** : Détecte les écrans ≤ 768px
- **isTablet** : Détecte les écrans ≤ 1024px

### Configuration du Canvas

```javascript
<Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
```

**Paramètres de la caméra :**
- `position`: [0, 0, 15] - Positionnement sur l'axe Z
- `fov`: 45° - Champ de vision (field of view)

### OrbitControls

Permet à l'utilisateur d'interagir avec la scène 3D :

**Propriétés :**
- `enablePan={false}` - Désactive le déplacement panoramique
- `enableZoom={!isTablet}` - Zoom désactivé sur tablettes
- `maxDistance={20}` - Distance maximale de zoom arrière
- `minDistance={5}` - Distance minimale de zoom avant
- `minPolarAngle={Math.PI / 5}` - Limite l'angle vertical minimum (~36°)
- `maxPolarAngle={Math.PI / 2}` - Limite l'angle vertical maximum (90°)

### Groupe principal

```javascript
<group
    scale={isMobile ? 0.7 : 1}
    position={[0, -4, 0]}
    rotation={[0, Math.PI / 4, 0]}
>
```

**Transformations :**
- `scale`: 0.7 sur mobile, 1 sinon
- `position`: Déplacé vers le bas de 4 unités
- `rotation`: Rotation de 45° sur l'axe Y (Math.PI / 4)

## Composants enfants

1. **HeroLights** - Gère tous les éclairages de la scène
2. **Room** - Affiche le modèle 3D de la pièce

## Utilisation

```javascript
import HeroExperience from "./components/HeroModels/HeroExperience"

function Hero() {
  return (
    <div className="hero-3d-layout">
      <HeroExperience />
    </div>
  )
}
```

## Notes techniques

- Le Canvas Three.js occupe tout l'espace de son conteneur parent
- L'interaction tactile est gérée automatiquement par OrbitControls
- La scène est optimisée pour mobile avec une échelle réduite
- Les limites d'angle empêchent la caméra de passer sous la scène