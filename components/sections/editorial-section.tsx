const specs = [
  { label: "Service Reliability", value: "99.99%" },
  { label: "Response Latency", value: "45 ms" },
  { label: "Latency Reduction", value: "-30%" },
  { label: "Deployed Microservices", value: "50+" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      <p className="px-6 pb-8 pt-12 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
        This is the Certifications section
      </p>

      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-video w-full overflow-hidden bg-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-contain"
          src="/videos/data-flow-loop.mp4"
        />
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-col justify-between border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-5xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
