import { supabaseBrowserClient } from '@/lib/supabase/browserClient'
import { UserResponse } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

// NOTE: i made this hook to fetch the authenticated supabase user
// client side. Don't think this will be needed but it's here anyways
// i suppose lol its useful for reference on supbase events ig

export function useAuthUser() {
  const [user, setUser] = useState<UserResponse | null>(null)

  useEffect(() => {
    const supabase = supabaseBrowserClient()

    const { data } = supabase.auth.onAuthStateChange(event => {
      console.log('event', event)
      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // we cannot use supabase functions within the callback,
        // but this is a hack to dispatch the function once the event is done
        setTimeout(async () => {
          const user = await supabase.auth.getUser()
          setUser(user)
        }, 0)
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return user
}
