import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../useCounter'

describe('useCounter Hook', () => {
    it('should initialize with default value of 0', () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.count).toBe(0)
    })

    it('should initialize with custom initial value', () => {
        const { result } = renderHook(() => useCounter(5))

        expect(result.current.count).toBe(5)
    })

    it('should increment count', () => {
        const { result } = renderHook(() => useCounter(0))

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })

    it('should decrement count', () => {
        const { result } = renderHook(() => useCounter(5))

        act(() => {
            result.current.decrement()
        })

        expect(result.current.count).toBe(4)
    })

    it('should reset count to initial value', () => {
        const { result } = renderHook(() => useCounter(10))

        act(() => {
            result.current.increment()
            result.current.increment()
        })

        expect(result.current.count).toBe(12)

        act(() => {
            result.current.reset()
        })

        expect(result.current.count).toBe(10)
    })

    it('should set count to specific value', () => {
        const { result } = renderHook(() => useCounter(0))

        act(() => {
            result.current.setCount(42)
        })

        expect(result.current.count).toBe(42)
    })

    it('should handle multiple operations', () => {
        const { result } = renderHook(() => useCounter(0))

        act(() => {
            result.current.increment()
            result.current.increment()
            result.current.decrement()
            result.current.setCount(100)
            result.current.increment()
        })

        expect(result.current.count).toBe(101)
    })

    it('should maintain referential stability of functions', () => {
        const { result, rerender } = renderHook(() => useCounter(0))

        const initialIncrement = result.current.increment
        const initialDecrement = result.current.decrement
        const initialReset = result.current.reset

        rerender()

        expect(result.current.increment).toBe(initialIncrement)
        expect(result.current.decrement).toBe(initialDecrement)
        expect(result.current.reset).toBe(initialReset)
    })
})
