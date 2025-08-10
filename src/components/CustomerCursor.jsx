'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  // Fix: Use useEffect to check isMobile on client only, and use state for SSR consistency
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  if (isMobile) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    gsap.set([cursor, follower].filter(Boolean), { xPercent: -50, yPercent: -50 });

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    let isActive = true;

    const animateCursor = () => {
      if (!isActive) return;
      posX += (mouseX - posX) / 7;
      posY += (mouseY - posY) / 7;
      if (cursor) gsap.set(cursor, { x: mouseX, y: mouseY });
      if (follower) gsap.set(follower, { x: posX, y: posY });
      requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleHover = () => {
      if (cursor) { gsap.to(cursor, { scale: 0.8, duration: 0.3 }); }
      if (follower) { gsap.to(follower, { scale: 1.5, duration: 0.3 }); }
    };

    const handleUnhover = () => {
      if (cursor) { gsap.to(cursor, { scale: 1, duration: 0.3 }); }
      if (follower) { gsap.to(follower, { scale: 1, duration: 0.3 }); }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    animateCursor();

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-6 h-6 pointer-events-none z-[9999] transform scale-100">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="2,2 20,12 10,14 8,22 2,2" fill="#fff" stroke="#000" strokeWidth="1.5"/>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
