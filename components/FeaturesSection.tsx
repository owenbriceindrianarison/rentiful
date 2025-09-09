'use client'

import { motion } from 'framer-motion'
import { FeaturedCard } from './FeaturedCard'

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function FeaturesSection() {
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
            className='bg-white px-6 py-24 sm:px-8 lg:px-12 xl:px-16'
        >
            <div className='mx-auto max-w-4xl xl:max-w-6xl'>
                <motion.h2
                    variants={itemVariants}
                    className='mb-center mx-auto mb-12 w-full text-center text-3xl font-bold sm:w-2/3'
                >
                    Quickly find the home you want using our effective search
                    filters!
                </motion.h2>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 xl:gap-16'>
                    {[0, 1, 2].map((item) => (
                        <motion.div key={item} variants={itemVariants}>
                            <FeaturedCard
                                imageSrc={`/landing-search${3 - item}.png`}
                                title={
                                    [
                                        'Trutworthy and Verified Listenings',
                                        'Browse Rental Listings with Ease',
                                        'Simplify Your Rental Search with Advanced',
                                    ][item]
                                }
                                description={
                                    [
                                        'Discover the best rental options with user reviews and ratings.',
                                        'Get access to user reviews and ratings for a better understanding of rental options.',
                                        'Find trustworthy and verified rental listings to ensure a hassle-free experience.',
                                    ][item]
                                }
                                linkText={
                                    ['Explore', 'Search', 'Discover'][item]
                                }
                                linkHref={
                                    ['/explore', '/search', '/discover'][item]
                                }
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
