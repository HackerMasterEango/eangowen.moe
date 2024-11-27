import TierList from '@/components/TierList/TierList'
import { ScrollArea } from '@/components/ui/scroll-area'

function Page() {
  return (
    <ScrollArea className="h-screen w-full">
      <div className="container px-4 py-24 mx-auto ">
        <TierList />
      </div>
    </ScrollArea>
  )
}

export default Page
