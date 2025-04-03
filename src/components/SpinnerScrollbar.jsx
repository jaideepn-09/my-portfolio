'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const SpinnerScrollbar = () => {
  const spinnerRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return // Do nothing on mobile

    const spinner = spinnerRef.current
    const track = trackRef.current
    const progress = progressRef.current

    gsap.set(spinner, { yPercent: -50, right: 20 })
    gsap.set(track, { height: '80vh', top: '10vh', right: 32 })
    gsap.set(progress, { scaleY: 0, transformOrigin: 'top' })

    let scrollY = 0
    let targetY = 0
    let animating = false

    const rotateSpinner = () => {
      gsap.to(spinner, {
        rotation: scrollY * 0.2,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const progressHeight = (scrollY / (docHeight - winHeight)) * 100

      gsap.to(progress, {
        scaleY: progressHeight * 0.01,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    const animateScroll = () => {
      if (!animating && Math.abs(targetY - scrollY) > 1) {
        animating = true
        gsap.to(window, {
          scrollTo: targetY,
          duration: 1.2,
          ease: 'power3.inOut',
          onUpdate: () => {
            scrollY = window.scrollY
            rotateSpinner()
            updateProgress()
          },
          onComplete: () => {
            animating = false
          }
        })
      }
      requestAnimationFrame(animateScroll)
    }

    const handleScroll = () => {
      targetY = window.scrollY
      if (!animating) {
        scrollY = targetY
        rotateSpinner()
        updateProgress()
      }
    }

    const handleDrag = () => {
      let startY = 0
      let startScroll = 0

      const onDragStart = (e) => {
        startY = e.clientY || e.touches[0].clientY
        startScroll = window.scrollY
        document.addEventListener('mousemove', onDragMove)
        document.addEventListener('touchmove', onDragMove)
        document.addEventListener('mouseup', onDragEnd)
        document.addEventListener('touchend', onDragEnd)
      }

      const onDragMove = (e) => {
        const y = e.clientY || e.touches[0].clientY
        const delta = y - startY
        const docHeight = document.documentElement.scrollHeight
        const winHeight = window.innerHeight
        targetY = startScroll + (delta * (docHeight / winHeight))
        e.preventDefault()
      }

      const onDragEnd = () => {
        document.removeEventListener('mousemove', onDragMove)
        document.removeEventListener('touchmove', onDragMove)
        document.removeEventListener('mouseup', onDragEnd)
        document.removeEventListener('touchend', onDragEnd)
      }

      spinner.addEventListener('mousedown', onDragStart)
      spinner.addEventListener('touchstart', onDragStart)
    }

    window.addEventListener('scroll', handleScroll)
    handleDrag()
    animateScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  return (
    <>
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div 
            ref={spinnerRef}
            className="absolute mt-8 w-8 h-8 rounded-full border-4 border-purple-500 border-t-transparent pointer-events-auto cursor-grab active:cursor-grabbing"
          />
        </div>
      )}
    </>
  )
}

export default SpinnerScrollbar
