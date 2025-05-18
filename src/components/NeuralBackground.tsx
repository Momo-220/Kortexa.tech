'use client';

import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimisation pour le rendu
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let nodes: any[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let lastFrameTime = 0;
    const targetFPS = 30; // Limiter les FPS pour économiser les ressources
    const frameInterval = 1000 / targetFPS;
    
    // Ajuster la taille du canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      // Définir les dimensions physiques du canvas selon le DPR
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      // Ajuster le style CSS pour maintenir les dimensions d'affichage
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      // Mettre à l'échelle le contexte de dessin
      ctx.scale(dpr, dpr);
      
      initNodes();
    };

    // Réduire le nombre de nœuds et optimiser leur placement
    const initNodes = () => {
      nodes = [];
      particles = [];
      
      // Ajuster la taille de la grille en fonction de l'appareil
      const isMobile = window.innerWidth < 768;
      const gridSize = isMobile ? 150 : 180;
      const nodeDensity = isMobile ? 0.4 : 0.5; // Réduire la densité sur mobile
      
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      const cols = Math.ceil(displayWidth / gridSize);
      const rows = Math.ceil(displayHeight / gridSize);
      
      // Créer des nœuds avec une densité réduite
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < nodeDensity) {
            const x = i * gridSize + Math.random() * (gridSize * 0.7);
            const y = j * gridSize + Math.random() * (gridSize * 0.7);
            
            nodes.push({
              x,
              y,
              radius: Math.random() * 1.2 + 0.8
            });
          }
        }
      }
      
      // Créer un nombre limité de particules
      const maxParticles = Math.min(nodes.length, isMobile ? 20 : 40);
      
      for (let i = 0; i < maxParticles; i++) {
        createParticle();
      }
    };

    // Simplifier la création de particules
    const createParticle = () => {
      if (nodes.length < 2) return;
      
      const sourceIndex = Math.floor(Math.random() * nodes.length);
      const sourceNode = nodes[sourceIndex];
      
      // Trouver une cible dans une distance raisonnable
      const maxDistance = 300;
      const possibleTargets = nodes.filter((node, idx) => {
        if (idx === sourceIndex) return false;
        
        const dx = sourceNode.x - node.x;
        const dy = sourceNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < maxDistance;
      });
      
      if (possibleTargets.length === 0) return;
      
      const targetNode = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
      const targetIndex = nodes.indexOf(targetNode);
      
      particles.push({
        sourceIndex,
        targetIndex,
        progress: 0,
        speed: Math.random() * 0.4 + 0.2, // Vitesse réduite
        color: `rgba(200, 200, 200, ${Math.random() * 0.5 + 0.2})`,
        size: Math.random() * 1.5 + 1
      });
    };

    // Dessiner avec un framerate limité
    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      lastFrameTime = timestamp;
      
      // Effacer le canvas avec une couleur de fond solide
      ctx.fillStyle = 'rgb(10, 10, 10)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Dessiner un nombre limité de connexions
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
      ctx.lineWidth = 0.8;
      
      const connectionsLimit = Math.min(nodes.length, 100);
      for (let i = 0; i < connectionsLimit; i++) {
        const nodeA = nodes[i];
        
        for (let j = i + 1; j < connectionsLimit && j < nodes.length; j++) {
          const nodeB = nodes[j];
          
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            
            // Simplifier - utiliser une ligne droite au lieu de lignes orthogonales
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }
      
      // Dessiner les nœuds
      ctx.fillStyle = 'rgba(180, 180, 180, 0.6)';
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Mettre à jour et dessiner les particules
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.progress += particle.speed / 100;
        
        if (particle.progress >= 1) {
          particles.splice(i, 1);
          
          // Ne pas créer une nouvelle particule à chaque fois pour limiter le nombre
          if (particles.length < 40 && Math.random() < 0.7) {
            createParticle();
          }
          continue;
        }
        
        const sourceNode = nodes[particle.sourceIndex];
        const targetNode = nodes[particle.targetIndex];
        
        // Calculer la position actuelle de la particule (ligne droite)
        const x = sourceNode.x + (targetNode.x - sourceNode.x) * particle.progress;
        const y = sourceNode.y + (targetNode.y - sourceNode.y) * particle.progress;
        
        // Dessiner la particule
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Gestionnaire d'événements simplifié pour le mouvement de la souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    animationFrameId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default NeuralBackground; 