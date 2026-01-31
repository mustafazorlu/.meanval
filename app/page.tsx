import {
  Navbar,
  Hero,
  TrustedBy,
  ValueProp,
  FeatureProposals,
  FeatureCRM,
  FeatureContracts,
  Testimonial,
  CTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustedBy />
        <ValueProp />
        <FeatureProposals />
        <FeatureCRM />
        <FeatureContracts />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
