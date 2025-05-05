# Windows Doors Website React - Project Rules and Documentation

## 1. Tech Stack and Architecture

- **Framework**: Next.js 15.3.1 with App Router
- **Routing Strategy**: Dynamic routing with ISR
- **URL Structure**: 
  - Exact match to Window World LA website (https://www.windowworldla.com/)
  - Examples: `/windows`, `/doors`, `/about-us`, `/contact-us`, etc.
  - All URLs will be extracted from Crawl4AI analysis

### Core Technical Components

- **Frontend**: Next.js, React 18.2.0, TypeScript, Tailwind CSS
- **Web Scraping**: Crawl4AI, Context7 MCP Server, Cheerio, Axios
- **API Integrations**: Google Maps API, Form submission APIs
- **Data Storage**: File-based storage for scraped content
- **Build Optimization**: ISR with 6-month cache (revalidate: 86400)

## 2. Data Management System

### Content Structure

The content structure will be determined by Crawl4AI analysis of the Window World LA website, but will likely include:

- **Products**: Windows, doors, siding categories and individual products
- **Services**: Installation, replacement, maintenance services
- **Locations**: Service areas and contact information
- **Media**: Images, videos, testimonials, and gallery items

### Batch Processing for Web Scraping

- Rate limiting to prevent API throttling when scraping
- Parallel processing with configurable batch sizes
- Error handling with retry logic
- Progress tracking and statistics
- Incremental scraping to avoid overloading the source website

## 3. UI Requirements

### Component Specifications

- **All UI Components**: Must be exact visual replicas of Window World LA components
- **Navigation Menu**: Must match all dropdowns and interactions from original site
- **Forms**: Must replicate all form fields, validation, and submission behavior
- **Interactive Elements**: Must match all sliders, galleries, and other interactive components
- **Responsive Design**: Must match the original site at all breakpoints

### Visual Requirements

- **Color Scheme**: Must match Window World LA exactly (primary blue #004b8d, etc.)
- **Typography**: Must match font families, sizes, weights, and spacing
- **Spacing and Layout**: Must match padding, margins, and overall layout
- **Images and Icons**: Must use identical or visually equivalent assets
- **Animations and Transitions**: Must replicate all animations and transition effects

## 4. Development Guidelines

### General Rules

- Before creating new components, check if they already exist in the codebase
- All documentation in docs/ folder following the established pyramid structure
- Follow component naming conventions that match the original site's structure
- Document code changes before committing
- Maintain exact visual and functional parity with the original site

### Best Practices

- Use the crawler admin interface to extract content before implementing components
- Check for existing files before creating new ones
- Preserve layouts when replacing images
- Use heavily commented code to explain how components match the original
- Clean Next.js cache when needed
- Test all components at multiple screen sizes to ensure responsive design matches

### Daily Logs

- Create logs in docs/daily-logs/
- Use YYYY-MM-DD format for filenames
- Never delete logs, only create new ones
- Update project-tasks.md and priority-list.md for new features
- Document all web scraping results and component implementations

## 5. Development Environment

### Setup Instructions

#### Directory Requirements
- Always run development server from the project root directory
- Ensure all paths are relative to the project root

#### Command Syntax
- Use semicolons (;) instead of && for commands
- Correct command: `cd path/to/project; npm run dev`
- For web scraping: `npm run dev:with-context7`

#### Troubleshooting
- If port conflicts occur, kill all ports first: `taskkill /F /FI "IMAGENAME eq node.exe"`
- Always verify current working directory before running development server
- Fix build errors before trying to run the development server

### Web Scraping Best Practices

1. Start with small batch sizes (5-10 pages) to verify configuration
2. Use conservative rate limits to avoid API throttling
3. Monitor the first few batches closely
4. Always check logs after completion
5. Document any custom configurations used
6. Save all extracted content to the appropriate directories

## 6. Documentation Standards

### Areas Where Documentation Adherence Needs Improvement

#### Strict Adherence to Documentation Standards
- Immediately check the documentation standards guide before making any changes
- Verify all required elements from the start rather than adding them incrementally
- Add table of contents for documentation over 400 lines

#### Complete Cross-Reference Updates
- Search for all references to specific terms across the codebase first
- Create a comprehensive list of all files needing updates before making any changes
- Always update the daily log when making significant changes

#### Proper Documentation Workflow
- Follow the exact workflow specified in the documentation standards
- Check for existing documentation before suggesting changes
- Verify the documentation pyramid structure before making edits

#### Attention to Detail in Documentation Requirements
- Pay close attention to the specific formatting requirements
- Ensure all dates are in the correct format (YYYY-MM-DD)
- Verify all links are using the correct relative paths

### Steps to Improve Documentation Adherence

#### Start with a Documentation Review
- Always begin by reviewing the documentation standards guide
- Create a checklist of required elements based on the standards
- Verify the current state of documentation before suggesting changes

#### Follow the Exact Workflow
- Follow the exact workflow specified in the documentation standards
- Check for existing documentation before creating or modifying files
- Verify the documentation pyramid structure before making edits

## 7. Exact Cloning Guidelines

### Component Mapping Process

1. Extract the original component using Crawl4AI
2. Analyze HTML structure, CSS styles, and JavaScript functionality
3. Create a React component that exactly matches the original
4. Implement all interactive behaviors using React hooks
5. Test the component against the original for visual and functional parity
6. Document any deviations or workarounds required

### Accessibility Enhancements

- Add proper ARIA attributes while maintaining visual parity
- Ensure keyboard navigation works for all interactive elements
- Maintain proper color contrast ratios
- Add descriptive alt text for all images
- Implement focus indicators that match the original site's style

### SEO Optimization

- Preserve all meta tags from the original site
- Maintain identical URL structure
- Implement structured data matching the original site
- Ensure all canonical links are preserved
- Generate a comprehensive sitemap

## 8. Testing Requirements

### Visual Testing

- Compare screenshots of components against the original site
- Test at multiple breakpoints to verify responsive design
- Verify all animations and transitions match the original

### Functional Testing

- Test all interactive elements for identical behavior
- Verify all form validations match the original
- Test navigation and routing to ensure it matches the original site
- Verify all external links are preserved

### Accessibility Testing

- Run automated accessibility tests (Lighthouse, axe)
- Perform keyboard navigation testing
- Test with screen readers
- Verify color contrast meets WCAG 2.1 AA standards

### Performance Testing

- Compare load times with the original site
- Optimize Core Web Vitals while maintaining visual parity
- Test on multiple devices and browsers
