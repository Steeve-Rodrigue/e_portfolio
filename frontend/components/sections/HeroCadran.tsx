import Image from 'next/image'
import { getProfile } from '@/lib/api'

export async function HeroCadran() {
  const profile = await getProfile()
  const { calendly_url: calendlyUrl } = profile

  return (
    <div className="relative w-[150px] h-[150px] sm:w-52 sm:h-52 md:w-64 md:h-64 xl:w-[340px] xl:h-[340px] rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(0,200,255,0.2)]">
      <Image src={calendlyUrl} alt="Steeve" fill className="object-cover" priority />
    </div>
  )
}
