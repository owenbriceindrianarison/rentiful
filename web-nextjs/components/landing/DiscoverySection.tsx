'use client'

import { motion } from 'framer-motion'
import { DiscoverCard } from '@/components/landing/DiscoverCard'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function DiscoverySection() {
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.8 }}
            variants={containerVariants}
            className='mb-16 bg-white py-12'
        >
            <div className='mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 xl:max-w-7xl xl:px-16'>
                <motion.div
                    variants={itemVariants}
                    className='my-12 text-center'
                >
                    <h2 className='text-3xl leading-tight font-semibold text-gray-800'>
                        Discover
                    </h2>
                    <p className='mt-4 text-lg text-gray-600'>
                        Find your Dream Rental Property Today!
                    </p>
                    <p className='mx-auto mt-2 max-w-3xl text-gray-500'>
                        Searching for your dream rental property has never been
                        easier. With our user-friendly search feature, you can
                        quickly find the project home that meets all your needs.
                        Start your search today and discover your dream rental
                        property!
                    </p>
                </motion.div>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 xl:gap-16'>
                    {[
                        {
                            imageSrc: '/landing-icon-wand.png',
                            title: 'Search for Property',
                            description:
                                'Browse through our extension collection of rental properties in your desired location.',
                        },
                        {
                            imageSrc: '/landing-icon-calendar.png',
                            title: 'Book Your Rental',
                            description:
                                "Once you've found the perfect rental property, easily book it online with just a few clicks.",
                        },
                        {
                            imageSrc: '/landing-icon-heart.png',
                            title: 'Enjoy your New Home',
                            description:
                                'Move into your new rental property and start enjoying your dream home.',
                        },
                    ].map((card, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <DiscoverCard {...card} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
