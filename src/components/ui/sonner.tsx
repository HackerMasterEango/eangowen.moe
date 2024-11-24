'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          success: `group toast group-[.toaster]:bg-green-700 
            group-[.toaster]:text-green-50 group-[.toaster]:shadow-lg border-none`,
          error: `group toast group-[.toaster]:bg-red-700 
            group-[.toaster]:text-red-50 group-[.toaster]:shadow-lg border-none`
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
