'use client'
import { useEffect, useRef, useState } from 'react'
import { LoginForm } from '../LoginForm'
import { Button } from '../ui/button'
import { AnimatePresence } from 'framer-motion'
import { logOut } from '@/actions/loginUsers'

type HeaderProps = {
  isLoggedIn: boolean
}
export const Header = ({ isLoggedIn }: HeaderProps) => {
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
    <div className="fixed top-0 right-0 left-0 h-16 bg-dark-900 border-b border-primary-500/10 z-10 flex items-center justify-between px-4">
      <div />
      <div className=" top-4 right-4 ">
        {isLoggedIn ? (
          <Button onClick={logOut}>logged in</Button>
        ) : (
          <Button onClick={() => setLogInFormIsOpen(true)}>Sign In</Button>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {loginFormOpen && <LoginForm ref={modalRef} onClose={() => setLogInFormIsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
