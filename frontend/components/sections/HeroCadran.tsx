import Image from 'next/image'

interface HeroCadranProps {
  photoUrl: string | null
}

export function HeroCadran({ photoUrl }: HeroCadranProps) {
  if (!photoUrl) return null
  return (
    <div className="relative w-[150px] h-[150px] sm:w-52 sm:h-52 md:w-64 md:h-64 xl:w-[340px] xl:h-[340px] rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(0,200,255,0.2)]">
      <Image src={photoUrl} alt="Steeve" fill className="object-cover" priority />
    </div>
  )
}
