import { GachaCard } from '@/components/GachaCard'

function Page() {
  return (
    <div className="p-6">
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
