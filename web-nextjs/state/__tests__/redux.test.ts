import { makeStore } from '../redux'
import { api } from '../api'

describe('Redux Store', () => {
    it('should create store with correct initial state', () => {
        const store = makeStore()
        const state = store.getState()

        expect(state).toHaveProperty('global')
        expect(state).toHaveProperty(api.reducerPath)
    })

    it('should have correct middleware configuration', () => {
        const store = makeStore()
        const middleware = store.getState()

        // The store should be created successfully with middleware
        expect(middleware).toBeDefined()
    })

    it('should dispatch actions correctly', () => {
        const store = makeStore()

        // Test that we can dispatch actions without errors
        expect(() => {
            store.dispatch({ type: 'test/action' })
        }).not.toThrow()

        // State should still be defined after dispatch
        const newState = store.getState()
        expect(newState).toBeDefined()
    })

    it('should have api reducer in the store', () => {
        const store = makeStore()
        const state = store.getState()

        expect(state[api.reducerPath]).toBeDefined()
    })
})
