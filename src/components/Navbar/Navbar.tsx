'use client'
import { AnimationControls, motion } from 'framer-motion'
import { Book } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { TRAY_ANIMATION_WRAPPER_VARIANTS } from './NavigationWrapper'
import { usePathname } from 'next/navigation'
import { NAV_BAR_ITEMS } from './navBarItems'

const svgVariants = {
  close: {
    rotate: 360
  },
  open: {
    rotate: 180
  }
}

type NavbarProps = {
  isOpen: boolean
  containerControls: AnimationControls
  svgControls: AnimationControls
  handleOpenClose: () => void
}
const Navbar = ({ isOpen, containerControls, svgControls, handleOpenClose }: NavbarProps) => {
  const pathname = usePathname()

  const navItems = useMemo(() => {
    const currentPath = pathname.split('/')[1]

    return NAV_BAR_ITEMS[currentPath] ?? []
  }, [pathname])

  return (
    <motion.nav
      variants={TRAY_ANIMATION_WRAPPER_VARIANTS}
      animate={containerControls}
      data-expanded={isOpen}
      initial="close"
      className="hidden md:flex bg-dark-900 flex-col z-20 h-screen flex-shrink-0 flex-grow-0"
    >
      <div className=" w-full min-h-16 border-b border-primary-500/10 flex justify-between items-center">
        <div className="flex justify-between place-items-center px-5 w-full">
          {/* 
        TODO: whatever page user is on change the mascot to relevant anime hoe */}
          {/* <div className="w-10 h-10 bg-primary-500 rounded-full " /> */}
          <Image
            src="/heaven-burns-red/app_logo_400x400.jpg"
            className="w-10 h-10 rounded-full overflow-hidden"
            alt="hero"
            width={40}
            height={40}
          />

          <button className="p-1" onClick={handleOpenClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-100"
            >
              <motion.path
                variants={svgVariants}
                animate={svgControls}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
                initial="close"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 shadow-[1px_0_0_0_#00c27f15] h-full">
        {navItems.map(({ name, icon: Icon }, index) => (
          <NavbarLinkItem key={index} name={name}>
            <Icon className="stroke-primary-500 min-w-8 w-8" />
          </NavbarLinkItem>
        ))}
      </div>
    </motion.nav>
  )
}

type NavbarLinkItemProps = {
  name: string
  children: React.ReactNode
}
const NavbarLinkItem = ({ name, children }: NavbarLinkItemProps) => {
  return (
    <Link
      href="#"
      className="flex py-3 rounded cursor-pointer hover:stroke-primary-500
         stroke-primary-400 text-neutral-100 hover:text-primary-50 place-items-center
         gap-3 hover:bg-primary-900/20 transition-colors duration-300 ease-in-out"
    >
      {children}
      <span className="text-inherit overflow-hidden">{name}</span>
    </Link>
  )
}

export default Navbar
