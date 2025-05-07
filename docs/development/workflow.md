# Development Workflow Documentation

## Overview

This document provides a detailed description of the development workflow for the Windows Doors Website React project. It covers the development environment setup, coding standards, version control workflow, testing procedures, and deployment process.

## Development Environment

### 1. Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)
- Git
- Visual Studio Code (recommended)

### 2. Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/windows-doors-website-react.git
   cd windows-doors-website-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` with your environment-specific values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   CONTEXT7_API_KEY=your-context7-api-key
   UNSPLASH_ACCESS_KEY=your-unsplash-access-key
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

### 3. Running the Development Server

Run the development server with Netlify Dev:

```bash
npm run netlify:dev
```

This will start the Netlify development server at http://localhost:8888.

To run the development server with Context7 MCP:

```bash
npm run netlify:dev:with-context7
```

## Coding Standards

### 1. TypeScript

- Use TypeScript for all new code.
- Define interfaces for all props and state.
- Use type inference where possible.
- Avoid using `any` type.

Example:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) {
  // Component implementation
}
```

### 2. React

- Use functional components with hooks.
- Use the App Router pattern for routing.
- Use server components where appropriate.
- Use client components for interactive elements.

Example:

```typescript
// app/products/[slug]/page.tsx
import { getProductsByCategory } from '@/lib/services/product-service';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, products } = await getProductsByCategory(params.slug);
  
  return (
    <div>
      <h1>{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
```

### 3. CSS

- Use Tailwind CSS for styling.
- Use the `cn` utility function for conditional class names.
- Follow the Tailwind CSS naming conventions.

Example:

```typescript
import { cn } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### 4. File Structure

- Use the App Router pattern for routing.
- Place components in the `/components` directory.
- Place utility functions in the `/lib` directory.
- Place types in the `/types` directory.
- Place API routes in the `/app/api` directory.

Example:

```
/app
  /page.tsx (Home page)
  /products
    /[slug]
      /page.tsx (Category page)
      /[productSlug]
        /page.tsx (Product page)
/components
  /ui
    /Button.tsx
    /Container.tsx
    /ProductCard.tsx
/lib
  /database.ts
  /services
    /product-service.ts
/types
  /database.ts
```

## Version Control Workflow

### 1. Branching Strategy

- `main`: Production branch. All code in this branch should be deployable.
- `develop`: Development branch. All feature branches are merged into this branch.
- `feature/feature-name`: Feature branches. Created from `develop` and merged back into `develop`.
- `bugfix/bug-name`: Bug fix branches. Created from `develop` and merged back into `develop`.
- `hotfix/hotfix-name`: Hotfix branches. Created from `main` and merged into both `main` and `develop`.

### 2. Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

Example:

```
feat(product-card): add support for product features

- Add features list to product card
- Add styling for features list
- Update tests

Closes #123
```

### 3. Pull Request Process

1. Create a feature branch from `develop`.
2. Make changes and commit them following the commit message format.
3. Push the branch to the remote repository.
4. Create a pull request to merge the branch into `develop`.
5. Request a review from at least one team member.
6. Address any feedback from the review.
7. Once approved, merge the pull request.

### 4. Code Review Guidelines

- Review code for correctness, readability, and maintainability.
- Check that the code follows the coding standards.
- Verify that the code is properly tested.
- Ensure that the code is accessible and follows SEO best practices.
- Look for potential performance issues.

## Testing Procedures

### 1. Unit Testing

Use Jest and React Testing Library for unit testing:

```typescript
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
  
  it('applies the correct class names for variant and size', () => {
    const { container } = render(
      <Button variant="secondary" size="lg">Click me</Button>
    );
    expect(container.firstChild).toHaveClass('bg-secondary');
    expect(container.firstChild).toHaveClass('h-11');
  });
});
```

### 2. Integration Testing

Use Playwright for integration testing:

```typescript
// tests/integration/product-page.test.ts
import { test, expect } from '@playwright/test';

test('product page displays product information', async ({ page }) => {
  await page.goto('/products/windows/double-hung-windows');
  
  await expect(page.getByRole('heading', { name: 'Double-Hung Windows' })).toBeVisible();
  await expect(page.getByText('Our most popular window style')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Double-Hung Windows' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Get a Free Estimate' })).toBeVisible();
});
```

### 3. Accessibility Testing

Use axe-core for accessibility testing:

```typescript
// tests/accessibility/home-page.test.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/');
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 4. Performance Testing

Use Lighthouse for performance testing:

```typescript
// tests/performance/home-page.test.ts
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('homepage should have good performance', async ({ page }) => {
  await page.goto('/');
  
  const { lhr } = await playAudit({
    page,
    thresholds: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
    },
  });
  
  expect(lhr.categories.performance.score).toBeGreaterThanOrEqual(0.9);
  expect(lhr.categories.accessibility.score).toBeGreaterThanOrEqual(0.9);
  expect(lhr.categories['best-practices'].score).toBeGreaterThanOrEqual(0.9);
  expect(lhr.categories.seo.score).toBeGreaterThanOrEqual(0.9);
});
```

## Deployment Process

### 1. Continuous Integration

The project uses GitHub Actions for continuous integration:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
```

### 2. Continuous Deployment

The project uses Netlify for continuous deployment:

```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[dev]
  command = "next dev"
  port = 8888
  targetPort = 3000
  framework = "nextjs"
  publish = ".next"
  autoLaunch = true

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"
```

### 3. Deployment Environments

- **Production**: The `main` branch is deployed to the production environment.
- **Staging**: The `develop` branch is deployed to the staging environment.
- **Preview**: Pull requests are deployed to preview environments.

### 4. Rollback Procedure

If a deployment causes issues, follow these steps to roll back:

1. Go to the Netlify dashboard.
2. Navigate to the "Deploys" section.
3. Find the last successful deploy.
4. Click "Publish deploy" to roll back to that deploy.

## Conclusion

The development workflow for the Windows Doors Website React project is designed to ensure code quality, maintainability, and a smooth deployment process. It includes coding standards, version control workflow, testing procedures, and deployment process guidelines.
