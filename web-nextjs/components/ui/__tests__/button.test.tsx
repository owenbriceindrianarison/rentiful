import { render, screen } from '@testing-library/react'
import { Button } from '../button'

// Mock next-intl/navigation
const MockLink = ({
    children,
    href,
    ...props
}: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
}) => (
    <a href={href} {...props}>
        {children}
    </a>
)

jest.mock('../../../i18n/navigation', () => ({
    Link: MockLink,
}))

describe('Button Component', () => {
    it('renders button with default props', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('bg-primary')
    })

    it('renders button with different variants', () => {
        render(<Button variant='destructive'>Delete</Button>)

        const button = screen.getByRole('button', { name: /delete/i })
        expect(button).toHaveClass('bg-destructive')
    })

    it('renders button with different sizes', () => {
        render(<Button size='lg'>Large Button</Button>)

        const button = screen.getByRole('button', { name: /large button/i })
        expect(button).toHaveClass('h-10')
    })

    it('renders as child component when asChild is true', () => {
        render(
            <Button asChild>
                <MockLink href='/test'>Link Button</MockLink>
            </Button>,
        )

        const link = screen.getByRole('link', { name: /link button/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/test')
    })

    it('applies custom className', () => {
        render(<Button className='custom-class'>Custom</Button>)

        const button = screen.getByRole('button', { name: /custom/i })
        expect(button).toHaveClass('custom-class')
    })

    it('handles click events', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        const button = screen.getByRole('button', { name: /click me/i })
        button.click()

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>)

        const button = screen.getByRole('button', { name: /disabled button/i })
        expect(button).toBeDisabled()
        expect(button).toHaveClass('disabled:opacity-50')
    })
})
