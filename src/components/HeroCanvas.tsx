import React, { useEffect, useRef } from 'react';

interface HeroCanvasProps {
  interactive?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node structure
    const numNodes = Math.min(65, Math.floor((width * height) / 14000));
    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      phase: number;
      orbitSpeed: number;
      orbitRadius: number;
      patternGroup: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const r = Math.min(width, height) * (0.15 + (i % 4) * 0.08);
      const bx = width / 2 + Math.cos(angle) * r;
      const by = height / 2 + Math.sin(angle) * r;
      nodes.push({
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        orbitSpeed: (0.0008 + Math.random() * 0.0012) * (i % 2 === 0 ? 1 : -1),
        orbitRadius: 15 + Math.random() * 40,
        patternGroup: i % 4
      });
    }

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid accent
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;

      // Center dynamic pattern formation
      const centerX = width / 2;
      const centerY = height / 2;
      const primaryRadius = Math.min(width, height) * 0.32;

      // Draw subtle orbital guide circles
      ctx.beginPath();
      ctx.arc(centerX, centerY, primaryRadius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(242, 101, 34, 0.04)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, primaryRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.stroke();

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Morph between organic drift and geometric alignment based on time
        const wave = Math.sin(time * 0.3 + n.phase);
        const orbitAngle = time * n.orbitSpeed * 10 + n.phase;
        
        const targetX = n.baseX + Math.cos(orbitAngle) * n.orbitRadius + Math.sin(time + n.phase) * 12;
        const targetY = n.baseY + Math.sin(orbitAngle) * n.orbitRadius + Math.cos(time + n.phase) * 12;

        n.x += (targetX - n.x) * 0.05;
        n.y += (targetY - n.y) * 0.05;

        // Mouse interaction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          n.x -= (dx / dist) * force * 18;
          n.y -= (dy / dist) * force * 18;
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const cdx = n.x - n2.x;
          const cdy = n.y - n2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxDist = width < 768 ? 95 : 130;

          if (cdist < maxDist) {
            const alpha = (1 - cdist / maxDist) * 0.22;
            
            // Check if near mouse for orange glow
            const mouseNear = dist < 120 || Math.sqrt((mouse.x - n2.x) ** 2 + (mouse.y - n2.y) ** 2) < 120;

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            if (mouseNear) {
              ctx.strokeStyle = `rgba(242, 101, 34, ${alpha * 2.2})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        if (dist < 100) {
          ctx.fillStyle = '#F26522';
          ctx.shadowColor = '#F26522';
          ctx.shadowBlur = 10;
        } else if (n.patternGroup === 0) {
          ctx.fillStyle = 'rgba(242, 101, 34, 0.7)';
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(241, 235, 230, 0.6)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-75"
    />
  );
};
