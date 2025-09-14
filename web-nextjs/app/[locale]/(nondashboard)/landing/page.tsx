import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { DiscoverySection } from '@/components/landing/DiscoverySection'
import { CallToActionSection } from '@/components/landing/CallToActionSection'
import { FooterSection } from '@/components/landing/FooterSection'

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <DiscoverySection />
            <CallToActionSection />
            <FooterSection />
        </div>
    )
}
