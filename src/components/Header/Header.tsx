'use client'
import { useEffect, useRef, useState } from 'react'
import { LoginForm } from '../LoginForm'
import { Button } from '../ui/button'
import { AnimatePresence, AnimationControls } from 'framer-motion'
import { logOut } from '@/actions/loginUsers'
import { motion } from 'framer-motion'
import { TRAY_ANIMATION_WRAPPER_VARIANTS } from '../Navbar/NavigationWrapper'

type HeaderProps = {
  isLoggedIn: boolean
  containerControls: AnimationControls
}
export const Header = ({ isLoggedIn, containerControls }: HeaderProps) => {
  const [loginFormOpen, setLogInFormIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setLogInFormIsOpen(false)
      }
    }

    if (loginFormOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [loginFormOpen])

  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-dark-900 border-b border-primary-500/10 z-10  px-4">
      <div className="flex items-center h-full">
        <motion.div variants={TRAY_ANIMATION_WRAPPER_VARIANTS} animate={containerControls} initial="close" />

        <div className="flex-1">place navigation here</div>

        <div className="pr-4">
          {isLoggedIn ? (
            <Button onClick={logOut}>logged in</Button>
          ) : (
            <Button onClick={() => setLogInFormIsOpen(true)}>Sign In</Button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {loginFormOpen && <LoginForm ref={modalRef} onClose={() => setLogInFormIsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
