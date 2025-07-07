Bloom Pool Manager
A React application for creating and managing sponsored credit pools in the Arweave ecosystem, designed to simplify pool creation, access control, and usage tracking.
Overview
Bloom Pool Manager enables users to create, manage, and monitor sponsored credit pools for Arweave. It offers a user-friendly interface for configuring pools, managing access, and tracking usage with seamless wallet integration.
Features

Pool Management: Create and configure credit pools with custom settings.
Access Control: Whitelist specific Arweave addresses for pool access.
Real-time Analytics: Monitor pool balances and usage.
Wallet Integration: Connect with Beacon or Wander wallets for secure transactions.
Time Tracking: Visualize pool duration with countdown timers.

User Inputs
The application collects the following inputs from users:

Pool Name: A unique name for the credit pool.
Start/End Time: UTC-based start and end dates for pool activity.
Usage Cap: Maximum Turbo credits per wallet (e.g., 0.01 credits).
Whitelisted Addresses: List of valid 43-character Arweave addresses (one per line).
Wallet Connection: Requires an Arweave-compatible wallet (Beacon or Wander) for authentication and transactions.

Major Components

Dashboard: Main interface for viewing and managing pools, displaying pool counts, wallet status, and pool details like balance and duration.
Pool Management System: Handles pool creation, editing, deletion, credit sponsoring, and access revocation.
User Authentication: Manages wallet connections and retrieves active addresses for secure operations.
Notification System: Provides feedback for user actions (e.g., success or error messages).

Technology Stack

Framework: React with TypeScript for type-safe development.
Wallet Integration: Arweave Wallet Kit for Beacon and Wander wallet support.
Arweave Interaction: Turbo SDK for balance checks and transaction signing.

Project Structure
src/
├── components/     # Reusable UI components
├── pages/         # Page components (HomePage, Dashboard)
├── hooks/         # Custom hooks for pool and user management
├── types/         # TypeScript type definitions
├── utils/         # Utility functions (e.g., date formatting, address validation)
├── assets/        # Static assets
└── globals.css    # Global styles

License
© 2025 Bloom. All rights reserved.