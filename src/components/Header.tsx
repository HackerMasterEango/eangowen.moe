'use client'
import { useEffect, useRef, useState } from 'react'
import { LoginForm } from './LoginForm'
import { Button } from './ui/button'
import { AnimatePresence } from 'framer-motion'
import { useAuthUser } from '@/hooks/useAuthUser'

export const Header = () => {
  const [loginFormOpen, setLogInFormIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const user = useAuthUser()

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
    <>
      {!user && (
        <Button className="fixed top-4 right-4" onClick={() => setLogInFormIsOpen(true)}>
          Sign In
        </Button>
      )}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {loginFormOpen && <LoginForm ref={modalRef} onClose={() => setLogInFormIsOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
