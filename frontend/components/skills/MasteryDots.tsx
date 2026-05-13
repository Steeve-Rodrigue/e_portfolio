export function MasteryDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1 mt-1.5 justify-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="inline-block rounded-full"
          style={{
            width: 5,
            height: 5,
            background: i <= level ? '#ff6a00' : 'rgba(255,106,0,0.18)',
          }}
        />
      ))}
    </div>
  )
}
