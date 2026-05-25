export default function Loading() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center gap-5">
      {/* Spinner */}
      <div
        role="status"
        aria-label="Memuat halaman"
        className="relative flex items-center justify-center"
      >
        {/* Outer track */}
        <span className="block w-14 h-14 rounded-full border-4 border-kabola-teal/15" />
        {/* Spinning arc */}
        <span className="absolute block w-14 h-14 rounded-full border-4 border-transparent border-t-kabola-teal animate-spin" />
        {/* Inner dot */}
        <span className="absolute block w-3 h-3 rounded-full bg-kabola-teal/30" />
      </div>

      {/* Label */}
      <p className="text-navy/50 text-sm font-medium tracking-wide">
        Memuat Data…
      </p>
    </main>
  );
}
