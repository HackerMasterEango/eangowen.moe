import { GachaCard } from '@/components/GachaCard'

// write code for me
function Page() {
  return (
    <div>
      <h1 className="text-2xl text-neutral-100"> revue starlight relive</h1>

      <GachaCard
        type="guide"
        imgURL="/hsr-main.webp"
        href="#"
        title="himeko guide"
        description="himeko is a powerful trailblazer"
      />
    </div>
  )
}

export default Page
