export default function Timeline({className}) {
  const steps = [1, 2, 3, 4,5,6]

  return (
      <div className={`${className} relative flex items-center justify-between text-xs`}>

        {/* line */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-300" />

        {steps.map((step) => (
          <div
            key={step}
            className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"
          >
            {step}
          </div>
        ))}
      </div>
  )
}
