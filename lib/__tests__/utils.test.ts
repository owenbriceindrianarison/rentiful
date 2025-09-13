import { cn } from '../utils'

describe('cn utility function', () => {
    it('merges class names correctly', () => {
        const result = cn('px-4 py-2', 'bg-blue-500', 'text-white')
        expect(result).toBe('px-4 py-2 bg-blue-500 text-white')
    })

    it('handles conditional classes', () => {
        const isActive = true
        const result = cn('base-class', isActive && 'active-class')
        expect(result).toBe('base-class active-class')
    })

    it('handles conditional classes when condition is false', () => {
        const isActive = false
        const result = cn('base-class', isActive && 'active-class')
        expect(result).toBe('base-class')
    })

    it('handles undefined and null values', () => {
        const result = cn('base-class', undefined, null, 'valid-class')
        expect(result).toBe('base-class valid-class')
    })

    it('handles empty strings', () => {
        const result = cn('base-class', '', 'valid-class')
        expect(result).toBe('base-class valid-class')
    })

    it('merges conflicting Tailwind classes correctly', () => {
        const result = cn('px-4', 'px-2')
        expect(result).toBe('px-2') // px-2 should override px-4
    })

    it('handles arrays of classes', () => {
        const result = cn(['class1', 'class2'], 'class3')
        expect(result).toBe('class1 class2 class3')
    })

    it('handles objects with boolean values', () => {
        const result = cn({
            'active-class': true,
            'inactive-class': false,
            'conditional-class': true,
        })
        expect(result).toBe('active-class conditional-class')
    })
})
