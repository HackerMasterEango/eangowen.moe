'use client'
import { useAnimationControls } from 'framer-motion'
import { useState } from 'react'
import { Header } from '../Header/Header'
import Navbar from './Navbar'

// This variant is shared between the Navbar and Header components
// So the animation is perfectly in sync
export const TRAY_ANIMATION_WRAPPER_VARIANTS = {
  close: {
    width: '5rem',
    transition: {
      type: 'spring',
      damping: 15
    }
  },
  open: {
    width: '14rem',
    transition: {
      type: 'spring',
      damping: 15
    }
  }
}

type NavigationWrapperProps = {
  isLoggedIn: boolean
}
export const NavigationWrapper = ({ isLoggedIn }: NavigationWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
    containerControls.start(isOpen ? 'close' : 'open')
    svgControls.start(isOpen ? 'close' : 'open')
  }

  return (
    <>
      <Navbar
        isOpen={isOpen}
        containerControls={containerControls}
        svgControls={svgControls}
        handleOpenClose={handleOpenClose}
      />
      <Header isLoggedIn={isLoggedIn} containerControls={containerControls} />
    </>
  )
}
