import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { DiscoverySection } from '@/components/DiscoverySection'
import { CallToActionSection } from '@/components/CallToActionSection'

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <DiscoverySection />
            <CallToActionSection />
        </div>
    )
}
