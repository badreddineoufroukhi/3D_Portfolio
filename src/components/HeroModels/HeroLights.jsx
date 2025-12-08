import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* lamp's light */}
    <spotLight
      position={[2, 2, -1]}
      angle={0.2}
      penumbra={0.5}
      intensity={85}
      color="white"
    />
    {/* bluish overhead lamp */}
    <spotLight
      position={[2, 2, -1]}
      angle={0.4}
      penumbra={0.8}
      intensity={10}
      color="white"
    />
    {/* purplish side fill */}
    <spotLight
      position={[3, 4, 2]}
      angle={0.4}
      penumbra={1}
      intensity={60}
      color="#9d4edd"
    />
    {/* area light for soft moody fill */}
    <primitive
      object={new THREE.RectAreaLight("#a259ff", 8, 3, 2)}
      position={[2, 3, 1]}
      rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      intensity={1}
    />
    {/* subtle point light for atmospheric tone */}
    <pointLight position={[0, 1, 0]} intensity={10} color="#7209b7" />
    <pointLight position={[1, 2, -2]} intensity={10} color="#0d00a4" />
  </>
);

export default HeroLights;