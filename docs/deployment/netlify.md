# Netlify Deployment Documentation

## Overview

This document provides a detailed description of the Netlify deployment configuration for the Windows Doors Website React project. Netlify is used for hosting the application, providing continuous deployment, serverless functions, and other features.

## Netlify Configuration

The Netlify configuration is defined in the `netlify.toml` file at the root of the project:

```toml
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

### Build Configuration

- `build.command`: The command to build the application (`npm run build`).
- `build.publish`: The directory to publish after the build (`.next`).
- `build.functions`: The directory containing serverless functions (`netlify/functions`).

### Development Configuration

- `dev.command`: The command to start the development server (`next dev`).
- `dev.port`: The port for the Netlify development server (`8888`).
- `dev.targetPort`: The port for the Next.js development server (`3000`).
- `dev.framework`: The framework used (`nextjs`).
- `dev.publish`: The directory to publish in development mode (`.next`).
- `dev.autoLaunch`: Whether to automatically launch the browser when starting the development server (`true`).

### Redirects

- `/api/*` is redirected to `/.netlify/functions/api/:splat` with a status code of `200`. This allows API routes to be handled by Netlify Functions.

### Plugins

- `@netlify/plugin-nextjs`: A Netlify plugin for Next.js applications.

### Functions Configuration

- `functions.node_bundler`: The bundler to use for serverless functions (`esbuild`).

## Netlify Functions

Netlify Functions are serverless functions that run on Netlify's infrastructure. They are used to implement server-side functionality for the application.

### API Function

The API function handles API routes for the application:

```javascript
// netlify/functions/api.js
const { createRequestHandler } = require('@netlify/next');

module.exports.handler = createRequestHandler({
  compression: true,
});
```

This function uses `@netlify/next` to create a request handler for Next.js API routes.

## Environment Variables

The following environment variables are used for the Netlify deployment:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `CONTEXT7_API_KEY`: Context7 API key
- `UNSPLASH_ACCESS_KEY`: Unsplash API access key
- `GOOGLE_MAPS_API_KEY`: Google Maps API key

These environment variables are set in the Netlify dashboard under "Site settings" > "Build & deploy" > "Environment".

## Continuous Deployment

Netlify provides continuous deployment for the application. When changes are pushed to the main branch of the repository, Netlify automatically builds and deploys the application.

### Build Settings

- **Repository**: The GitHub repository for the project.
- **Branch**: The branch to deploy (`main`).
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`

### Deploy Contexts

Different deploy contexts can have different environment variables and settings:

- **Production**: The main branch (`main`).
- **Deploy Previews**: Pull requests.
- **Branch Deploys**: Other branches.

## Custom Domains

The application is deployed to a custom domain:

1. **Primary Domain**: `windowworldla.com`
2. **Aliases**:
   - `www.windowworldla.com`

### SSL/TLS Certificate

Netlify automatically provisions and renews SSL/TLS certificates for the custom domains using Let's Encrypt.

## Forms

Netlify Forms are used to handle form submissions without server-side code:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Form fields -->
</form>
```

Form submissions are stored in the Netlify dashboard under "Forms".

## Analytics

Netlify Analytics provides insights into the application's traffic and performance:

- **Page Views**: The number of page views.
- **Unique Visitors**: The number of unique visitors.
- **Top Pages**: The most visited pages.
- **Top Sources**: The sources of traffic.
- **Top Browsers**: The browsers used by visitors.
- **Top Operating Systems**: The operating systems used by visitors.

## Performance Optimization

Netlify provides several features for performance optimization:

### Asset Optimization

- **Bundling**: JavaScript and CSS files are bundled to reduce the number of requests.
- **Minification**: JavaScript and CSS files are minified to reduce their size.
- **Compression**: Assets are compressed using Brotli and Gzip.

### Caching

- **Browser Caching**: Assets are cached in the browser using cache-control headers.
- **CDN Caching**: Assets are cached on Netlify's CDN.

### Image Optimization

- **Next.js Image Optimization**: Images are optimized using Next.js Image component.
- **Responsive Images**: Images are served in different sizes based on the device.

## Monitoring and Logging

Netlify provides monitoring and logging features:

### Deploy Logs

Deploy logs show the output of the build process and can be used to troubleshoot build issues.

### Function Logs

Function logs show the output of serverless functions and can be used to troubleshoot function issues.

### Notifications

Notifications can be set up for deploy events:

- **Deploy Succeeded**: A notification is sent when a deploy succeeds.
- **Deploy Failed**: A notification is sent when a deploy fails.

## Conclusion

Netlify provides a comprehensive platform for deploying the Windows Doors Website React project. It offers continuous deployment, serverless functions, custom domains, forms, analytics, performance optimization, and monitoring features.
