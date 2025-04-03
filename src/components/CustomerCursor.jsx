'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const animateCursor = () => {
      posX += (mouseX - posX) / 7; // Smooth follow effect
      posY += (mouseY - posY) / 7;
      
      gsap.set(cursor, { x: mouseX, y: mouseY });
      gsap.set(follower, { x: posX, y: posY });

      requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Hover effect on interactive elements
    const handleHover = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.3 });
      gsap.to(follower, { scale: 1.5, duration: 0.3 });
    };

    const handleUnhover = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    // Start cursor animation
    animateCursor();

    return () => {
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
