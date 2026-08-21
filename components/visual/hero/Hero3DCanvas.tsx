"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    let animationFrameId: number;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 size-full pointer-events-none";
    canvas.style.opacity = "0.75";
    container.appendChild(canvas);

    // --- 2. Geometry & Nodes ---
    const isMobile = width < 768;
    const particleCount = isMobile ? 120 : 260;
    const maxDistance = isMobile ? 2.8 : 3.4;

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: THREE.Vector3[] = [];

    const primaryColor = new THREE.Color(0xff4d0f); // Brand Orange
    const accentColor = new THREE.Color(0xff8c42); // Amber
    const neutralColor = new THREE.Color(0xffffff); // Cyber White

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / spherical shell around the center to frame the portrait
      const radius = 3.2 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.75;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi) + (Math.random() - 0.5) * 1.5;
      const z = radius * Math.sin(theta) * Math.cos(phi) - 1.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
        ),
      );

      // Color distribution: mostly brand orange and subtle amber highlights
      const rand = Math.random();
      const nodeColor =
        rand > 0.65 ? primaryColor : rand > 0.3 ? accentColor : neutralColor;

      colors[i * 3] = nodeColor.r;
      colors[i * 3 + 1] = nodeColor.g;
      colors[i * 3 + 2] = nodeColor.b;

      sizes[i] = (1.8 + Math.random() * 2.6) * (isMobile ? 0.75 : 1);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );

    // Particle sprite texture (circular soft glow)
    const createCircleTexture = () => {
      const size = 64;
      const canvasTex = document.createElement("canvas");
      canvasTex.width = size;
      canvasTex.height = size;
      const ctx = canvasTex.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 120, 50, 0.85)");
      gradient.addColorStop(0.7, "rgba(255, 77, 15, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(canvasTex);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createCircleTexture();

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: particleTexture ?? undefined,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particleSystem);

    // --- 3. Dynamic Tensor Lines / Synapses ---
    const maxLineSegments = particleCount * 6;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // --- 4. Outer Tensor Orbital Ring ---
    const ringRadius = 6.4;
    const ringSegments = 64;
    const ringPositions = new Float32Array((ringSegments + 1) * 3);
    for (let i = 0; i <= ringSegments; i++) {
      const angle = (i / ringSegments) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius;
      ringPositions[i * 3 + 1] = Math.sin(angle) * ringRadius;
      ringPositions[i * 3 + 2] = -2;
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(ringPositions, 3),
    );
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xff4d0f,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.LineLoop(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI * 0.25;
    scene.add(ringMesh);

    // --- 5. Mouse Interaction & Parallax ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (event: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = (event.clientX / window.innerWidth) * 2 - 1;
      const normY = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX * 0.8;
      mouse.targetY = normY * 0.8;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- 6. Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- 7. Viewport Visibility Observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    // --- 8. Animation Loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth camera lerp with pointer
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        camera.position.x = mouse.x * 1.8;
        camera.position.y = mouse.y * 1.4;
        camera.lookAt(0, 0, 0);

        // Slow organic rotation of the entire lattice
        particleSystem.rotation.y = elapsedTime * 0.035;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;
        linesMesh.rotation.y = particleSystem.rotation.y;
        linesMesh.rotation.x = particleSystem.rotation.x;
        ringMesh.rotation.z = elapsedTime * 0.02;

        // Update positions with subtle floating pulse
        const posAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        let lineVertexCount = 0;
        const linePosAttr = linesGeometry.attributes.position as THREE.BufferAttribute;
        const lineColorAttr = linesGeometry.attributes.color as THREE.BufferAttribute;
        const linePosArray = linePosAttr.array as Float32Array;
        const lineColorArray = lineColorAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const vel = velocities[i];

          posArray[i3] += vel.x;
          posArray[i3 + 1] += vel.y;
          posArray[i3 + 2] += vel.z;

          // Boundary bounce relative to original position
          const ox = originalPositions[i3];
          const oy = originalPositions[i3 + 1];
          const oz = originalPositions[i3 + 2];

          if (Math.abs(posArray[i3] - ox) > 0.6) vel.x *= -1;
          if (Math.abs(posArray[i3 + 1] - oy) > 0.6) vel.y *= -1;
          if (Math.abs(posArray[i3 + 2] - oz) > 0.6) vel.z *= -1;

          // Connect nearby nodes with tensor line segments
          if (!isMobile) {
            for (let j = i + 1; j < particleCount; j++) {
              const j3 = j * 3;
              const dx = posArray[i3] - posArray[j3];
              const dy = posArray[i3 + 1] - posArray[j3 + 1];
              const dz = posArray[i3 + 2] - posArray[j3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

              if (dist < maxDistance && lineVertexCount < maxLineSegments * 2) {
                const alpha = Math.pow(1 - dist / maxDistance, 1.8) * 0.7;

                // Point 1
                linePosArray[lineVertexCount * 3] = posArray[i3];
                linePosArray[lineVertexCount * 3 + 1] = posArray[i3 + 1];
                linePosArray[lineVertexCount * 3 + 2] = posArray[i3 + 2];

                lineColorArray[lineVertexCount * 3] = 1.0 * alpha;
                lineColorArray[lineVertexCount * 3 + 1] = 0.3 * alpha;
                lineColorArray[lineVertexCount * 3 + 2] = 0.06 * alpha;
                lineVertexCount++;

                // Point 2
                linePosArray[lineVertexCount * 3] = posArray[j3];
                linePosArray[lineVertexCount * 3 + 1] = posArray[j3 + 1];
                linePosArray[lineVertexCount * 3 + 2] = posArray[j3 + 2];

                lineColorArray[lineVertexCount * 3] = 1.0 * alpha;
                lineColorArray[lineVertexCount * 3 + 1] = 0.3 * alpha;
                lineColorArray[lineVertexCount * 3 + 2] = 0.06 * alpha;
                lineVertexCount++;
              }
            }
          }
        }

        posAttr.needsUpdate = true;
        linesGeometry.setDrawRange(0, lineVertexCount);
        linePosAttr.needsUpdate = true;
        lineColorAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 9. Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      renderer.dispose();

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden select-none"
    />
  );
}
