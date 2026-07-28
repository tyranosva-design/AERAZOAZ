'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Cookie, 
  Scale, 
  Database, 
  Check 
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'cookie-policy' | 'methodology';

interface PolicyPageProps {
  initialTab?: PolicyTab;
  onBackToStream?: () => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({
  initialTab = 'privacy',
  onBackToStream
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="bg-white text-black min-h-screen font-body pb-20">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="border-b border-zinc-200 bg-zinc-50 py-3.5 px-4 sm:px-6 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {onBackToStream ? (
            <button
              onClick={onBackToStream}
              className="flex items-center justify-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 border border-black font-extrabold transition-colors cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO INTELLIGENCE STREAM</span>
            </button>
          ) : (
            <Link
              href="/"
              prefetch={true}
              className="flex items-center justify-center space-x-2 text-black hover:bg-black hover:text-white px-4 py-2 border border-black font-extrabold transition-colors cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO INTELLIGENCE STREAM</span>
            </Link>
          )}

          <div className="flex items-center space-x-2 text-[11px] font-bold text-zinc-600">
            <ShieldCheck className="w-4 h-4 text-black" />
            <span className="uppercase">COMPLIANCE & LEGAL DESK</span>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <section className="border-b-2 border-black bg-zinc-900 text-white py-14 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white text-black px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border border-black">
            <Lock className="w-4 h-4" />
            <span>TRANSPARENCY & LEGAL GOVERNANCE</span>
          </div>

          <h1 className="text-fluid-h1 font-bold font-heading tracking-tight uppercase leading-tight">
            POLICIES & GOVERNANCE
          </h1>

          <p className="text-sm sm:text-base font-body text-zinc-300 max-w-3xl leading-relaxed">
            AERAZOAZ is committed to data privacy, ethical research standards, transparent data collection, and clear terms of service for all users.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b-2 border-black pb-6 mb-12 font-mono text-xs font-bold uppercase">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 border transition-all cursor-pointer flex items-center space-x-2 min-h-[42px] ${
              activeTab === 'privacy'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-zinc-300 hover:border-black'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>01 • PRIVACY POLICY</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 border transition-all cursor-pointer flex items-center space-x-2 min-h-[42px] ${
              activeTab === 'terms'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-zinc-300 hover:border-black'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>02 • TERMS OF SERVICE</span>
          </button>

          <button
            onClick={() => setActiveTab('cookie-policy')}
            className={`px-4 py-2.5 border transition-all cursor-pointer flex items-center space-x-2 min-h-[42px] ${
              activeTab === 'cookie-policy'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-zinc-300 hover:border-black'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>03 • COOKIE POLICY</span>
          </button>

          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-4 py-2.5 border transition-all cursor-pointer flex items-center space-x-2 min-h-[42px] ${
              activeTab === 'methodology'
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-zinc-300 hover:border-black'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>04 • EDITORIAL METHODOLOGY</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-2 border-black bg-zinc-50 p-6 space-y-4 font-mono text-xs">
              <h3 className="font-heading font-extrabold text-sm uppercase text-black border-b border-black pb-2">
                POLICY DOCUMENT DETAILS
              </h3>
              
              <div className="space-y-2 text-zinc-700">
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-zinc-500">DOCUMENT ID:</span>
                  <span className="font-bold text-black uppercase">{activeTab.toUpperCase()}-2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-zinc-500">LAST REVISED:</span>
                  <span className="font-bold text-black">JULY 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-zinc-500">COMPLIANCE:</span>
                  <span className="font-bold text-black">GDPR / CCPA / ePrivacy</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">GOVERNING BODY:</span>
                  <span className="font-bold text-black">AERAZOAZ DATA DESK</span>
                </div>
              </div>
            </div>

            <div className="border border-zinc-300 p-5 space-y-3 bg-white text-xs">
              <h4 className="font-heading font-bold uppercase text-black">Data Privacy Contact</h4>
              <p className="text-zinc-600 leading-relaxed font-body">
                For questions regarding data removal requests, rights access under GDPR/CCPA, or editorial licensing:
              </p>
              <p className="font-mono font-bold text-black border-l-2 border-black pl-2">
                desk@aerazoaz.com
              </p>
            </div>
          </div>

          {/* Main Document Text */}
          <div className="lg:col-span-8 bg-white border-2 border-black p-6 sm:p-10 font-body space-y-8">

            {/* Tab 1: Privacy Policy */}
            {activeTab === 'privacy' && (
              <div className="space-y-6 text-zinc-800 text-sm leading-relaxed">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-black uppercase mb-2">
                    PRIVACY POLICY
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 uppercase">Effective Date: July 24, 2026</p>
                </div>

                <div className="border-l-4 border-black pl-4 py-1 bg-zinc-50">
                  <p className="font-medium text-black">
                    AERAZOAZ ("we," "our," or "the Platform") respects your privacy. We do not sell your personal data. This policy explains what information we collect, how we use it, and the choices you have.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    1. Information We Collect
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                    <li><strong>Usage Data:</strong> Basic analytics like browser type, device, pages visited, and general location (country/city level), collected to understand how people use the site and improve it.</li>
                    <li><strong>Cookies:</strong> We use cookies for basic site functionality, analytics, and to support affiliate links. If you click an affiliate link on our site and make a purchase, a cookie may track that referral so we can earn a commission — this doesn't cost you anything extra.</li>
                    <li><strong>Saved Preferences:</strong> Data stored in your browser (local storage) for things like bookmarks or calculator settings, which stays on your device.</li>
                    <li><strong>Direct Inquiries:</strong> Your email address, if you voluntarily contact us.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    2. How We Use Collected Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-700">
                    <li>To operate, maintain, and improve the website.</li>
                    <li>To understand which content is useful through aggregated, anonymized analytics.</li>
                    <li>To support affiliate partnerships that help fund the site (see our disclosure section for details).</li>
                    <li>To respond to inquiries sent to us directly.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    3. Third Parties & Affiliate Links
                  </h3>
                  <p>
                    Some links on AERAZOAZ are affiliate links, meaning we may earn a commission if you click through and make a purchase, at no extra cost to you. These links may use cookies from third-party affiliate networks to track referrals. We don't control how those third parties handle data beyond the referral itself — we recommend checking their own privacy policies if you have concerns.
                  </p>
                  <p>
                    We do not sell or share your personal information with advertisers for unrelated marketing purposes.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    4. Your Rights
                  </h3>
                  <p>
                    Depending on where you live (including under GDPR in the EU/EEA and CCPA in California), you may have the right to access, correct, or request deletion of your personal data, or ask us to limit how it's used. To exercise these rights, contact desk@aerazoaz.com.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    5. Changes to This Policy
                  </h3>
                  <p>
                    As AERAZOAZ grows and adds new features, tools, or partnerships, this policy may be updated. We'll revise the "Last Revised" date above whenever changes are made.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Terms of Service */}
            {activeTab === 'terms' && (
              <div className="space-y-6 text-zinc-800 text-sm leading-relaxed">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-black uppercase mb-2">
                    TERMS OF SERVICE
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 uppercase">Effective Date: July 24, 2026</p>
                </div>

                <div className="border-l-4 border-black pl-4 py-1 bg-zinc-50">
                  <p className="font-medium text-black">
                    By accessing AERAZOAZ, you agree to these Terms of Service. If you don't agree with any part of these terms, please discontinue use of the platform.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    1. Educational & Research Disclaimer
                  </h3>
                  <p>
                    All publications, rate calculators, regulatory analyses, and benchmarks published by AERAZOAZ are compiled for informational and market research purposes only. AERAZOAZ does not provide legal, tax, accounting, or financial advice. Independent operators should consult licensed professionals for specific legal or tax circumstances.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    2. Intellectual Property & Citation Policy
                  </h3>
                  <p>
                    All original research, datasets, and graphics published by AERAZOAZ are our intellectual property. You're welcome to cite or quote excerpts, provided you include proper attribution and a direct link back to the original AERAZOAZ article.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    3. Affiliate Links & Advertising
                  </h3>
                  <p>
                    AERAZOAZ may include affiliate links, sponsored content, or promotional partnerships. Where this applies, it will be clearly labeled. We may earn a commission from purchases made through these links, at no additional cost to you. These partnerships never influence our editorial findings or data.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    4. Acceptable Use
                  </h3>
                  <p>
                    Users agree not to misuse the site — including attempting to overload our servers, scrape content at scale without permission, or attempt unauthorized security testing on our systems.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    5. Limitation of Liability
                  </h3>
                  <p>
                    AERAZOAZ is provided on an "as-is" and "as-available" basis, without warranties of any kind. AERAZOAZ is not liable for business decisions, platform fee disputes, or earnings variations resulting from reliance on our research or reports.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    6. Changes to These Terms
                  </h3>
                  <p>
                    As AERAZOAZ grows, these terms may be updated. We'll revise the "Last Revised" date above whenever changes are made.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Cookie Policy */}
            {activeTab === 'cookie-policy' && (
              <div className="space-y-6 text-zinc-800 text-sm leading-relaxed">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-black uppercase mb-2">
                    COOKIE & LOCAL STORAGE POLICY
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 uppercase">Effective Date: July 24, 2026</p>
                </div>

                <div className="border-l-4 border-black pl-4 py-1 bg-zinc-50">
                  <p className="font-medium text-black">
                    AERAZOAZ uses minimal cookies and browser storage (LocalStorage) to remember your preferences, support basic site security, and help fund the platform through affiliate partnerships.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    1. Types of Storage We Use
                  </h3>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="border border-black p-3 bg-zinc-50 space-y-1">
                      <div className="flex items-center justify-between font-bold text-black">
                        <span>STRICTLY NECESSARY (ESSENTIAL)</span>
                        <span className="bg-black text-white px-2 py-0.5">ALWAYS ACTIVE</span>
                      </div>
                      <p className="text-zinc-600 font-body text-xs">
                        Used for basic security, fraud prevention, and keeping the site functioning properly as you browse.
                      </p>
                    </div>

                    <div className="border border-zinc-300 p-3 bg-white space-y-1">
                      <div className="flex items-center justify-between font-bold text-black">
                        <span>PREFERENCES (LOCAL STORAGE)</span>
                        <span className="bg-zinc-200 text-black px-2 py-0.5">USER CONTROLLED</span>
                      </div>
                      <p className="text-zinc-600 font-body text-xs">
                        Stores saved article bookmarks (aerazoaz_saved_posts) and your cookie consent choice (aerazoaz_cookie_consent) locally on your device.
                      </p>
                    </div>

                    <div className="border border-zinc-300 p-3 bg-white space-y-1">
                      <div className="flex items-center justify-between font-bold text-black">
                        <span>ANALYTICS & PERFORMANCE</span>
                        <span className="bg-zinc-200 text-black px-2 py-0.5">OPTIONAL</span>
                      </div>
                      <p className="text-zinc-600 font-body text-xs">
                        Anonymized data on traffic patterns and page performance, used to understand what content is useful without identifying individual visitors.
                      </p>
                    </div>

                    <div className="border border-zinc-300 p-3 bg-white space-y-1">
                      <div className="flex items-center justify-between font-bold text-black">
                        <span>AFFILIATE & PARTNERSHIP TRACKING</span>
                        <span className="bg-zinc-200 text-black px-2 py-0.5">OPTIONAL</span>
                      </div>
                      <p className="text-zinc-600 font-body text-xs">
                        When you click an affiliate or partner link on AERAZOAZ, a cookie may be set by that third party to track the referral, so we can earn a commission if you make a purchase. This comes at no extra cost to you. We don't control how third-party affiliate networks handle this data beyond the referral itself.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    2. Managing Cookie Preferences
                  </h3>
                  <p>
                    You can adjust or revoke your cookie choices at any time directly within your browser settings.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Editorial & Methodology Policy */}
            {activeTab === 'methodology' && (
              <div className="space-y-6 text-zinc-800 text-sm leading-relaxed">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-black uppercase mb-2">
                    EDITORIAL & METHODOLOGY DISCLOSURE
                  </h2>
                  <p className="font-mono text-xs text-zinc-500 uppercase">Effective Date: July 24, 2026</p>
                </div>

                <div className="border-l-4 border-black pl-4 py-1 bg-zinc-50">
                  <p className="font-medium text-black">
                    AERAZOAZ operates on a strict zero-guru, editorial-independence-first research policy. Our mandate is empirical evidence and transparent digital labor market data — not opinion, and not paid influence.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    1. Editorial Independence Mandate
                  </h3>
                  <p>
                    We do not accept payment to rank, feature, or favorably review specific software tools, freelance marketplaces, or financial services. AERAZOAZ may include affiliate links or sponsored content on the platform — where this applies, it is always clearly labeled. These partnerships never influence our data, our findings, or our conclusions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    2. Data Collection & Sample Sizing Standard
                  </h3>
                  <p>
                    Every rate benchmark, platform take-rate report, or regulatory synthesis explicitly states its verified sample size, collection period, and primary source documents (e.g., official filings, government records, or published transaction data).
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-bold font-heading text-black uppercase border-b border-zinc-300 pb-1">
                    3. Corrections & Peer Review
                  </h3>
                  <p>
                    If an error or updated dataset is identified, AERAZOAZ publishes a public changelog note at the top of the impacted research document, detailing the exact metrics revised.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
