import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./globals.css"
import { ArweaveWalletKit } from "arweave-wallet-kit"
import { UserProvider } from "./hooks/useUser.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "DISPATCH", "SIGNATURE"],
        ensurePermissions: true,
        appInfo: {
          name: "Bloom Pool Manager",
        },
      }}
    >
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ArweaveWalletKit>
  </React.StrictMode>
)