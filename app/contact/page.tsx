import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { Mail, ArrowLeft, ShieldCheck, FileText, Clock, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Editorial Desk | AERAZOAZ',
  description: 'Reach out to the AERAZOAZ Editorial Data Desk via direct email at desk@aerazoaz.com.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          {/* Top Breadcrumb Nav */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-8 font-mono text-xs">
            <Link
              href="/"
              prefetch={true}
              className="inline-flex items-center justify-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 border border-black font-extrabold transition-colors cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOME STREAM</span>
            </Link>

            <div className="flex items-center space-x-2 text-zinc-500 font-bold hidden sm:flex">
              <Mail className="w-4 h-4 text-black" />
              <span>EDITORIAL DESK DISPATCH</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="border-b-2 border-black pb-6 mb-10">
            <div className="inline-block bg-black text-white font-mono text-[11px] font-bold uppercase px-3 py-1 tracking-widest mb-3">
              AERAZOAZ COMMUNICATIONS
            </div>
            <h1 className="text-fluid-h1 font-extrabold font-heading text-black uppercase tracking-tight mb-3">
              CONTACT EDITORIAL DESK
            </h1>
            <p className="text-fluid-body font-body text-zinc-700 max-w-2xl leading-relaxed">
              For research inquiries, press dispatches, data feedback, or empirical corrections, contact our desk directly via email.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="border-2 border-black bg-zinc-50 p-6 sm:p-10 shadow-md space-y-6">
                <div className="flex items-center space-x-3 text-black font-mono text-xs font-extrabold uppercase border-b-2 border-black pb-4">
                  <Mail className="w-5 h-5 text-black shrink-0" />
                  <span>DIRECT EMAIL DESK</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base font-body text-zinc-800 leading-relaxed">
                    You can reach our editorial and research team directly at:
                  </p>

                  <div className="bg-white border-2 border-black p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-zinc-500 uppercase block mb-1">
                        OFFICIAL EDITORIAL ADDRESS
                      </span>
                      <a
                        href="mailto:desk@aerazoaz.com"
                        className="text-xl sm:text-3xl font-mono font-extrabold text-black underline decoration-2 hover:bg-black hover:text-white px-2 py-1 -ml-2 transition-colors inline-flex items-center gap-2"
                      >
                        <span>desk@aerazoaz.com</span>
                        <ExternalLink className="w-5 h-5 inline shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-zinc-700 bg-white border border-zinc-200 p-4">
                  <div className="flex items-center space-x-2 text-black font-bold">
                    <Clock className="w-4 h-4 text-black shrink-0" />
                    <span>RESPONSE TIME EXPECTATIONS</span>
                  </div>
                  <p className="leading-relaxed">
                    We review all incoming editorial mail carefully. Replies are typically dispatched within 1 to 3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border-2 border-black bg-zinc-50 p-6 space-y-4">
                <div className="flex items-center space-x-2 border-b border-black pb-3 font-mono text-xs font-bold text-black uppercase">
                  <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                  <span>EDITORIAL GUIDELINES</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-zinc-700 leading-relaxed">
                  <div>
                    <strong className="text-black block mb-0.5">PRESS & DATA TIPS:</strong>
                    <span>Include verifiable references or background context when submitting research tips.</span>
                  </div>

                  <div>
                    <strong className="text-black block mb-0.5">RESEARCH ENQUIRIES:</strong>
                    <span>For dataset methodology queries, reference the specific report title or publication date.</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-black bg-white p-6 space-y-3">
                <div className="flex items-center space-x-2 font-mono text-xs font-bold text-black uppercase">
                  <FileText className="w-4 h-4 text-black shrink-0" />
                  <span>QUICK EXPLORE</span>
                </div>
                <div className="pt-1 flex flex-col space-y-2 font-mono text-xs font-bold uppercase">
                  <Link href="/reports" prefetch={true} className="hover:underline text-black py-1">→ REPORTS STREAM</Link>
                  <Link href="/guides" prefetch={true} className="hover:underline text-black py-1">→ PRACTICAL GUIDES</Link>
                  <Link href="/tools" prefetch={true} className="hover:underline text-black py-1">→ FREELANCE TOOLS</Link>
                  <Link href="/news" prefetch={true} className="hover:underline text-black py-1">→ POLICY & LEGISLATION</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
