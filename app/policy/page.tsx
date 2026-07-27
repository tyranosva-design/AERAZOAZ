import { Metadata } from 'next';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { PolicyPage as PolicyContent, PolicyTab } from '@/src/components/PolicyPage';

export const metadata: Metadata = {
  title: 'Governance & Privacy Policies | AERAZOAZ',
  description: 'AERAZOAZ compliance, privacy policy, terms of service, cookie disclosures, and editorial research methodology.',
};

interface PolicyProps {
  searchParams?: Promise<{ tab?: PolicyTab }>;
}

export default async function Policy({ searchParams }: PolicyProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const activeTab: PolicyTab = resolvedSearchParams.tab || 'privacy';

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-body selection:bg-black selection:text-white">
      <Header activeView="policy" />
      <main className="flex-1">
        <PolicyContent initialTab={activeTab} />
      </main>
      <Footer />
    </div>
  );
}
