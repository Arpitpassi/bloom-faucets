import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./globals.css"
import { ArweaveWalletKit } from "arweave-wallet-kit"
import { UserProvider } from "./hooks/useUser.tsx"
// import AoSyncStrategy from "@vela-ventures/aosync-strategy" // Import AoSyncStrategy

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ArweaveWalletKit
    config={{
      permissions: [
        "ACCESS_ADDRESS",
        "ACCESS_PUBLIC_KEY", // Added for Beacon Wallet support
        "SIGN_TRANSACTION",
        "DISPATCH",
      ],
      ensurePermissions: true,
      // strategies property removed as it is not supported by Config type
    }}
  >
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </ArweaveWalletKit>
)