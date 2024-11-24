import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect } from 'react'
import { loginUser } from '@/actions/loginUsers'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '-50%',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
}

type LoginFormProps = {
  onClose: () => void
  ref: React.RefObject<HTMLDivElement>
}
export function LoginForm({ onClose, ref }: LoginFormProps) {
  const [data, action, isPending] = useActionState(loginUser, undefined)

  // have to synchronize with server
  useEffect(() => {
    if (!data) return

    if (data.success) {
      toast.success('Event has been created.')
      onClose()
      return
    }

    toast.error('Failed to login. Please try again.')
  }, [data, onClose])

  return (
    <motion.div
      ref={ref}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        x: '-50%'
      }}
      className="mx-auto max-w-sm fixed z-40 top-1/2 left-1/2 "
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={action}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={data?.fieldData.email}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" defaultValue={data?.fieldData.password} name="password" type="password" required />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
            <Button disabled={isPending} variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" onClick={onClose} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
