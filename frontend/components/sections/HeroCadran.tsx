import Image from 'next/image'

export function HeroCadran() {
  return (
    <div className="relative w-80 h-80 xl:w-[420px] xl:h-[420px] rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(0,200,255,0.2)]">
      <Image src="/photo.jpg" alt="Steeve" fill className="object-cover" priority />
    </div>
  )
}
