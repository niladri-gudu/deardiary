import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-zinc-100 rounded flex items-center justify-center">
                <span className="text-zinc-950 font-black text-xs">J</span>
              </div>
              <span className="text-zinc-100 font-bold tracking-tighter">JOURNAL.AI</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Building the future of personal reflection. Designed for those who seek clarity in the chaos.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-zinc-100 font-semibold text-sm">Product</h4>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">RAG Search</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Mobile App</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Lifetime Deal</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-zinc-100 font-semibold text-sm">Company</h4>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Changelog</Link>
          </div>

          {/* Social / Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="text-zinc-100 font-semibold text-sm">Connect</h4>
            <Link href="https://twitter.com" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Twitter (X)</Link>
            <Link href="https://github.com" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">GitHub</Link>
            <Link href="mailto:hello@journal.ai" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Support</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Journal AI. Built with love by nILADRI.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-zinc-500 text-xs">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}