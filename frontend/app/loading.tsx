export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      {/* Animated radar rings */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute w-32 h-32 rounded-full border border-orange/20 animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <div
          className="absolute w-20 h-20 rounded-full border border-orange/30 animate-ping"
          style={{ animationDuration: '2s', animationDelay: '0.4s' }}
        />
        <div className="w-12 h-12 rounded-full bg-orange/10 border-2 border-orange flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-slate font-grotesk font-bold text-lg tracking-tight">
          Steeve<span className="text-orange">.</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
