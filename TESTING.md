# Guide de Tests - Rentiful NextJS

Ce projet utilise Jest et React Testing Library pour les tests unitaires.

## Scripts disponibles

- `npm test` - Exécute tous les tests
- `npm run test:watch` - Exécute les tests en mode watch (relance automatiquement les tests lors des modifications)
- `npm run test:coverage` - Exécute les tests avec un rapport de couverture

## Configuration

### Jest

- Configuration dans `jest.config.js`
- Setup dans `jest.setup.js`
- Environnement de test : `jsdom` (pour tester les composants React)

### Dépendances de test

- `jest` - Framework de test
- `@testing-library/react` - Utilitaires pour tester les composants React
- `@testing-library/jest-dom` - Matchers Jest personnalisés pour le DOM
- `@testing-library/user-event` - Simulation d'événements utilisateur
- `jest-environment-jsdom` - Environnement DOM pour Jest

## Structure des tests

Les tests sont organisés dans des dossiers `__tests__` à côté des fichiers qu'ils testent :

```
components/
  ui/
    button.tsx
    __tests__/
      button.test.tsx
lib/
  utils.ts
  __tests__/
    utils.test.ts
```

## Exemples de tests

### Test de composant React

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
    it('renders button with default props', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })
})
```

### Test de fonction utilitaire

```tsx
import { cn } from '../utils'

describe('cn utility function', () => {
    it('merges class names correctly', () => {
        const result = cn('px-4 py-2', 'bg-blue-500')
        expect(result).toBe('px-4 py-2 bg-blue-500')
    })
})
```

### Test de hook personnalisé

```tsx
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../useCounter'

describe('useCounter Hook', () => {
    it('should increment count', () => {
        const { result } = renderHook(() => useCounter(0))

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })
})
```

## Exécution des tests avec Docker

Les tests peuvent être exécutés dans le container Docker :

```bash
# Tests simples
docker-compose exec -T web npm test

# Tests avec couverture
docker-compose exec -T web npm run test:coverage

# Tests en mode watch
docker-compose exec -T web npm run test:watch
```

## Bonnes pratiques

1. **Nommage des fichiers** : Utilisez `.test.tsx` ou `.test.ts` pour les fichiers de test
2. **Organisation** : Placez les tests dans des dossiers `__tests__` à côté des fichiers sources
3. **Couverture** : Visez une couverture de code élevée, surtout pour les composants critiques
4. **Tests descriptifs** : Utilisez des descriptions claires pour vos tests
5. **Tests isolés** : Chaque test doit être indépendant et ne pas dépendre d'autres tests

## Rapports de couverture

Le rapport de couverture montre :

- **% Stmts** : Pourcentage de déclarations exécutées
- **% Branch** : Pourcentage de branches testées
- **% Funcs** : Pourcentage de fonctions testées
- **% Lines** : Pourcentage de lignes exécutées

Les fichiers non couverts sont listés avec leurs numéros de ligne.
