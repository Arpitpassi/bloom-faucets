# Bloom Faucet Manager

A tool for creating and managing sponsored credit faucets in the Arweave ecosystem, designed to simplify faucet creation and access tracking.

## Features

- **Faucet Management**: Create and configure credit faucets with custom settings.
- **Access Control**: Whitelist specific Arweave addresses for faucet access.
- **Wallet Integration**: Connect with Beacon or Wander wallets for secure transactions.
- **Time Tracking**: Visualize faucet duration with countdown timers.

## User Inputs

The application collects the following inputs from users:

- **Faucet Name**: A name for the credit faucet.
- **Start/End Time**: For faucet activity and its duration.
- **Usage Cap**: Maximum Turbo credits per wallet (e.g., 0.01 credits).
- **Whitelisted Addresses**: List of valid 43-character Arweave addresses.
- **Wallet Connection**: Requires an Arweave-compatible wallet (Beacon or Wander) for authentication and transactions.

**Disclaimer**: The application requires "Allow All Transactions" permission from the wallet to programmatically transfer credit access to all wallets.

## Major Components

- **Dashboard**: Main interface for viewing and managing faucets, displaying faucet counts, wallet status, and faucet details like balance and duration.
- **Faucet Management System**: Handles faucet creation, editing, deletion, credit sponsoring, and access revocation.
- **User Authentication**: Manages wallet connections and retrieves active addresses for secure operations.
- **Notification System**: Provides feedback for user actions (e.g., success or error messages).

## Technology Stack

- **Framework**: React with TypeScript.
- **Wallet Integration**: Arweave Wallet Kit for Beacon and Wander wallet support.
- **Arweave Interaction**: Turbo SDK for balance checks and transaction signing.