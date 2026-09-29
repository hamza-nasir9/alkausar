"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { radiusFor } from "@/lib/cakeConfig";

const TIER_H = 0.62;

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function Tier({ radius, y, flavor }) {
  const g = useRef();
  useFrame((_, dt) => {
    const s = g.current.scale.x;
    const n = s + (1 - s) * Math.min(1, dt * 8);
    g.current.scale.set(n, n, n);
  });
  return (
    <group ref={g} position={[0, y, 0]} scale={0.6}>
      <mesh>
        <cylinderGeometry args={[radius, radius, TIER_H, 64]} />
        <meshStandardMaterial color={flavor.sponge} roughness={0.75} />
      </mesh>
      <mesh position={[0, TIER_H / 2 - 0.035, 0]}>
        <cylinderGeometry args={[radius * 1.02, radius * 1.02, 0.07, 64]} />
        <meshStandardMaterial color={flavor.frosting} roughness={0.4} />
      </mesh>
      <mesh position={[0, -TIER_H / 2 + 0.035, 0]}>
        <cylinderGeometry args={[radius * 1.02, radius * 1.02, 0.07, 64]} />
        <meshStandardMaterial color={flavor.frosting} roughness={0.4} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius * 1.012, radius * 1.012, 0.05, 64]} />
        <meshStandardMaterial color={flavor.filling} roughness={0.35} />
      </mesh>
    </group>
  );
}

function GoldLeaf({ tiers, baseRadius }) {
  const flecks = useMemo(() => {
    const rand = rng(11);
    const out = [];
    for (let t = 0; t < tiers; t++) {
      const r = baseRadius * Math.pow(0.72, t);
      for (let i = 0; i < 14; i++) {
        const a = rand() * Math.PI * 2;
        out.push({
          pos: [Math.cos(a) * r * 1.03, t * TIER_H + 0.12 + rand() * (TIER_H - 0.24), Math.sin(a) * r * 1.03],
          rot: [0, Math.PI / 2 - a, (rand() - 0.5) * 1.2],
          s: 0.06 + rand() * 0.07,
        });
      }
    }
    return out;
  }, [tiers, baseRadius]);

  return flecks.map((f, i) => (
    <mesh key={i} position={f.pos} rotation={f.rot}>
      <planeGeometry args={[f.s, f.s * 0.8]} />
      <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} side={2} />
    </mesh>
  ));
}

function Berries({ y, radius }) {
  const berries = useMemo(() => {
    const out = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      out.push({ pos: [Math.cos(a) * radius * 0.72, y + 0.06, Math.sin(a) * radius * 0.72], c: i % 2 ? "#2a2f6e" : "#b3122f" });
    }
    out.push({ pos: [0, y + 0.08, 0], c: "#b3122f" });
    out.push({ pos: [radius * 0.25, y + 0.07, radius * 0.15], c: "#2a2f6e" });
    out.push({ pos: [-radius * 0.2, y + 0.07, -radius * 0.2], c: "#b3122f" });
    return out;
  }, [y, radius]);

  return berries.map((b, i) => (
    <mesh key={i} position={b.pos}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshStandardMaterial color={b.c} roughness={0.35} />
    </mesh>
  ));
}

function Sprinkles({ y, radius }) {
  const items = useMemo(() => {
    const rand = rng(7);
    const colors = ["#ff5a7a", "#ffd23f", "#4cc9f0", "#7bd88f", "#ffffff"];
    return Array.from({ length: 46 }, () => {
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * radius * 0.92;
      return { pos: [Math.cos(a) * d, y + 0.02, Math.sin(a) * d], rot: rand() * Math.PI, c: colors[Math.floor(rand() * colors.length)] };
    });
  }, [y, radius]);

  return items.map((s, i) => (
    <mesh key={i} position={s.pos} rotation={[0, s.rot, 0]}>
      <boxGeometry args={[0.1, 0.025, 0.025]} />
      <meshStandardMaterial color={s.c} roughness={0.5} />
    </mesh>
  ));
}

function Cake({ flavor, size, layers, toppings }) {
  const baseR = radiusFor(size);
  const totalH = layers * TIER_H;
  const topR = baseR * Math.pow(0.72, layers - 1);

  return (
    <group position={[0, -totalH / 2 + 0.05, 0]}>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[baseR * 1.32, baseR * 1.32, 0.08, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.25} />
      </mesh>
      {Array.from({ length: layers }).map((_, i) => (
        <Tier key={i} flavor={flavor} radius={baseR * Math.pow(0.72, i)} y={i * TIER_H + TIER_H / 2} />
      ))}
      {toppings.includes("gold") && <GoldLeaf tiers={layers} baseRadius={baseR} />}
      {toppings.includes("berries") && <Berries y={totalH} radius={topR} />}
      {toppings.includes("sprinkles") && <Sprinkles y={totalH} radius={topR} />}
      <ContactShadows position={[0, -0.1, 0]} opacity={0.55} scale={9} blur={2.6} far={2} />
    </group>
  );
}

export default function CakeCanvas3D({ flavor, size, layers, toppings }) {
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(pointer: fine)").matches), []);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 2.3, 6.4], fov: 34 }} aria-label="3D cake preview">
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={2.2} />
      <pointLight position={[-4, 2, -3]} intensity={12} color="#D4AF37" />
      <pointLight position={[3, -1, 4]} intensity={6} color="#ffd9a8" />
      <Cake flavor={flavor} size={size} layers={layers} toppings={toppings} />
      <OrbitControls autoRotate autoRotateSpeed={1.4} enableZoom={false} enablePan={false} enableRotate={fine} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}
