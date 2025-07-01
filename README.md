# Bloom Pool Manager - Vite

A React application for creating and managing sponsored credit pools for the Arweave ecosystem, now powered by Vite.

## Features

- Pool Management: Create and manage multiple sponsor pools
- Access Control: Whitelist specific addresses with granular permissions
- Real-time Analytics: Monitor pool usage and track spending
- Wallet Integration: Support for Beacon and Wander wallets
- Time Tracking: Visual countdown timers for pool duration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Arweave-compatible wallet (Beacon or Wander)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update environment variables in `.env` as needed

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Migration from Next.js

This project has been migrated from Next.js to Vite while maintaining all existing functionality:

- Replaced Next.js App Router with React Router
- Updated build configuration for Vite
- Converted Next.js specific imports to standard React patterns
- Maintained all existing components and business logic
- Preserved styling and UI components

## Technology Stack

- **Build Tool**: Vite
- **Framework**: React 19
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Wallet Integration**: Arweave wallet strategies

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── pages/              # Page components (HomePage, Dashboard)
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
├── assets/             # Static assets
└── globals.css         # Global styles
\`\`\`

## License

© 2025 Bloom. All rights reserved.
