import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="border-2 border-black p-10 sm:p-16 bg-zinc-50 shadow-md space-y-6">
          <div className="inline-block bg-black text-white px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest">
            ERROR 404 • DATA POINT NOT FOUND
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-black uppercase tracking-tight">
            RESEARCH REPORT UNMAPPED
          </h1>

          <p className="text-base sm:text-lg font-body text-zinc-700 max-w-xl mx-auto leading-relaxed">
            The requested category or research article slug does not exist in the AERAZOAZ intelligence ledger. It may have been relocated or updated.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono text-xs font-bold uppercase">
            <Link 
              href="/" 
              className="bg-black text-white px-6 py-3.5 border-2 border-black hover:bg-zinc-800 transition-colors shadow-sm"
            >
              RETURN TO MAIN INTELLIGENCE STREAM
            </Link>
            <Link 
              href="/search" 
              className="bg-white text-black px-6 py-3.5 border-2 border-black hover:bg-zinc-100 transition-colors shadow-sm"
            >
              SEARCH RESEARCH ARCHIVE
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
