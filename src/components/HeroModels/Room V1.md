# Room.jsx

## Description

`Room` est le composant qui charge et affiche le modèle 3D de la pièce de travail. Il applique des matériaux personnalisés, des textures et des effets de bloom sélectif pour créer une scène stylisée et visuellement attrayante.

## Dépendances

```javascript
import { useGLTF, useTexture } from "@react-three/drei"
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
```

## Ressources chargées

### Modèle 3D
```javascript
const { nodes, materials } = useGLTF("/models/optimized-room.glb")
```
Charge le modèle GLTF de la pièce avec tous ses meshes et matériaux.

### Texture
```javascript
const matcapTexture = useTexture("/images/textures/mat1.png")
```
Texture MatCap utilisée pour le matériau du corps.

## Matériaux personnalisés

Le composant définit plusieurs matériaux Three.js pour différents éléments de la scène :

### 1. curtainMaterial (Rideaux)
```javascript
new THREE.MeshPhongMaterial({ color: "#d90429" })
```
- Type : Phong (réflexion spéculaire)
- Couleur : Rouge vif (#d90429)

### 2. bodyMaterial (Corps)
```javascript
new THREE.MeshPhongMaterial({ map: matcapTexture })
```
- Type : Phong avec texture MatCap
- Simule un éclairage complexe via la texture

### 3. tableMaterial (Table/Meuble)
```javascript
new THREE.MeshPhongMaterial({ color: "#582f0e" })
```
- Couleur : Marron bois (#582f0e)

### 4. radiatorMaterial (Radiateur)
```javascript
new THREE.MeshPhongMaterial({ color: "#fff" })
```
- Couleur : Blanc

### 5. compMaterial (Ordinateur)
```javascript
new THREE.MeshStandardMaterial({ color: "#fff" })
```
- Type : Standard (PBR - Physically Based Rendering)
- Couleur : Blanc

### 6. pillowMaterial (Oreillers)
```javascript
new THREE.MeshPhongMaterial({ color: "#8338ec" })
```
- Couleur : Violet (#8338ec)

### 7. chairMaterial (Chaise)
```javascript
new THREE.MeshPhongMaterial({ color: "#000" })
```
- Couleur : Noir

## Effets visuels

### SelectiveBloom

```javascript
<EffectComposer>
  <SelectiveBloom
    selection={screensRef}
    intensity={0.5}
    luminanceThreshold={0.2}
    luminanceSmoothing={0.9}
    blendFunction={BlendFunction.ADD}
  />
</EffectComposer>
```

**Paramètres :**
- `selection`: Référence aux écrans (effet de lueur)
- `intensity`: 0.5 - Force du bloom
- `luminanceThreshold`: 0.2 - Luminance minimale pour déclencher l'effet
- `luminanceSmoothing`: 0.9 - Transition douce
- `blendFunction`: ADD - Mode de fusion additif

## Structure des meshes

Le composant rend environ 35 meshes individuels représentant différents objets :

**Principaux éléments :**
- Rideaux (`_________6_blinn1_0`)
- Corps (`body1_blinn1_0`)
- Meubles/Armoire (`cabin_blinn1_0`)
- Chaise (`chair_body_blinn1_0`)
- Ordinateur (`comp_blinn1_0`)
- **Écrans avec bloom** (`emis_lambert1_0`) - Référencé par `screensRef`
- Clavier (`keyboard_blinn1_0`)
- Souris (`miuse_blinn1_0`)
- Moniteurs (`monitor2_blinn1_0`, `monitor3_blinn1_0`)
- Lampe (`lamp_bl_blinn1_0`, `lamp_white_blinn1_0`)
- Oreillers (`pillows_blinn1_0`)
- Radiateur (`radiator_blinn1_0`)
- Table (`table_blinn1_0`)
- Tablette graphique (`tablet_blinn1_0`)
- Stylet (`stylus_blinn1_0`)
- Aspirateur (`vacuum1_blinn1_0`, etc.)
- Fenêtre (`window_blinn1_0`, `window4_phong1_0`)

## Préchargement

```javascript
useGLTF.preload("/models/optimized-room.glb")
```
Précharge le modèle 3D pour éviter les délais de chargement.

## Utilisation

```javascript
import { Room } from "./Room"

function Scene() {
  return (
    <group position={[0, -4, 0]} rotation={[0, Math.PI / 4, 0]}>
      <Room />
    </group>
  )
}
```

## Optimisations

- Utilisation d'un modèle optimisé (`optimized-room.glb`)
- Préchargement du modèle
- Bloom sélectif uniquement sur les écrans
- Matériaux personnalisés pour un meilleur contrôle visuel

## Notes techniques

- Le modèle a été généré avec `gltfjsx` pour une intégration React optimale
- L'effet de bloom crée une lueur réaliste sur les écrans
- Les matériaux Phong offrent un bon compromis performance/qualité
- Le matériau Standard (PBR) est utilisé uniquement pour l'ordinateur pour plus de réalisme