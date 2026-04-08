export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter">JOURNAL.AI</div>
        <div className="space-x-8 text-sm font-medium">
          <a href="/signin" className="hover:text-gray-400 transition-colors">Sign In</a>
          <a href="/signup" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-all">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto text-center pt-24 pb-16 px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          Talk to your <span className="text-gray-500 italic">past self.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The only journal that listens. Capture your thoughts today, and ask 
          your journal questions tomorrow using AI-powered RAG.
        </p>
        <div className="mt-10">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-xl text-lg hover:scale-105 transition-transform">
            Start Your Lifetime Journey
          </button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-24">
        <div className="p-8 border border-zinc-800 rounded-3xl bg-zinc-900/50">
          <h3 className="text-xl font-bold mb-4">Semantic Search</h3>
          <p className="text-gray-400 text-sm">Don't just search for keywords. Ask "When did I last feel truly happy?" and get answers.</p>
        </div>
        <div className="p-8 border border-zinc-800 rounded-3xl bg-zinc-900/50">
          <h3 className="text-xl font-bold mb-4">Zero Egress Fees</h3>
          <p className="text-gray-400 text-sm">Your memories and photos are stored securely on Cloudflare R2, keeping costs low for life.</p>
        </div>
        <div className="p-8 border border-zinc-800 rounded-3xl bg-zinc-900/50">
          <h3 className="text-xl font-bold mb-4">Habit Loops</h3>
          <p className="text-gray-400 text-sm">Intelligent prompts and streak tracking designed to build a writing habit that sticks.</p>
        </div>
      </section>
    </div>
  );
}