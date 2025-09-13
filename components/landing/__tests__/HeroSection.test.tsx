import { render, screen, fireEvent } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({
        src,
        alt,
        fill,
        priority,
        ...props
    }: {
        src: string
        alt: string
        fill?: boolean
        priority?: boolean
        [key: string]: unknown
    }) => (
        <img
            src={src}
            alt={alt}
            {...(fill && { style: { position: 'absolute', inset: 0 } })}
            {...(priority && { 'data-priority': 'true' })}
            {...props}
        />
    ),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({
            children,
            ...props
        }: {
            children: React.ReactNode
            [key: string]: unknown
        }) => <div {...props}>{children}</div>,
    },
}))

describe('HeroSection Component', () => {
    beforeEach(() => {
        // Mock console.log to avoid noise in tests
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders hero section with title and description', () => {
        render(<HeroSection />)

        expect(
            screen.getByText(
                /Start your journey to finding the perfect place to call home/i,
            ),
        ).toBeInTheDocument()
        expect(
            screen.getByText(/Explore our wide range of rental properties/i),
        ).toBeInTheDocument()
    })

    it('renders search input and button', () => {
        render(<HeroSection />)

        const searchInput = screen.getByPlaceholderText(
            /Search by city, neighboardhood or address/i,
        )
        const searchButton = screen.getByRole('button', { name: /search/i })

        expect(searchInput).toBeInTheDocument()
        expect(searchButton).toBeInTheDocument()
    })

    it('handles search input changes', () => {
        render(<HeroSection />)

        const searchInput = screen.getByPlaceholderText(
            /Search by city, neighboardhood or address/i,
        )

        fireEvent.change(searchInput, { target: { value: 'Paris' } })

        expect(console.log).toHaveBeenCalledWith('Paris')
    })

    it('handles search button click', () => {
        render(<HeroSection />)

        const searchButton = screen.getByRole('button', { name: /search/i })

        fireEvent.click(searchButton)

        expect(console.log).toHaveBeenCalledWith('Search button clicked')
    })

    it('renders hero image with correct attributes', () => {
        render(<HeroSection />)

        const heroImage = screen.getByAltText('Hero Section')

        expect(heroImage).toBeInTheDocument()
        expect(heroImage).toHaveAttribute('src', '/landing-splash.jpg')
    })

    it('has correct CSS classes for styling', () => {
        render(<HeroSection />)

        const heroImage = screen.getByAltText('Hero Section')
        const searchInput = screen.getByPlaceholderText(
            /Search by city, neighboardhood or address/i,
        )
        const searchButton = screen.getByRole('button', { name: /search/i })

        expect(heroImage).toHaveClass('object-cover', 'object-center')
        expect(searchInput).toHaveClass('h-12', 'w-full', 'max-w-lg')
        expect(searchButton).toHaveClass('h-12')
    })
})
