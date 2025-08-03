"use client"

import { X, ClipboardPen } from "lucide-react"
import { copyToClipboard } from "../utils/utils"

interface UseSharedCreditsGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UseSharedCreditsGuideModal({ isOpen, onClose }: UseSharedCreditsGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-xs border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-muted-foreground p-1 hover:bg-muted transition-colors rounded-xs"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Bloom Faucets: Upload to Arweave Using Sponsored Credits
        </h1>
        <p className="mb-6 text-muted-foreground">
          Easily upload your data to Arweave without paying from your own wallet, using shared credits from a Bloom
          Faucet.
        </p>
        <div className="bg-destructive/10 border-l-4 border-destructive p-4 mb-4 rounded-xs">
          <p className="font-semibold text-destructive">
            Note: To use sponsored credits, your wallet address must be whitelisted by the sponsor.
          </p>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Quick Start</h2>
        <p className="mb-4 text-muted-foreground">
          Here’s how to upload with Bloom Faucet credits based on how you're uploading:
        </p>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left text-sm font-semibold text-foreground">Method</th>
              <th className="border border-border p-3 text-left text-sm font-semibold text-foreground">
                How to use Faucet credits
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 text-muted-foreground">Turbo CLI</td>
              <td className="border border-border p-3 text-muted-foreground">
                No extra steps. CLI will auto-use any Faucet credits.
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 text-muted-foreground">Bloom Uploads</td>
              <td className="border border-border p-3 text-muted-foreground">
                Create profile to generate a new wallet, or connect a wallet with sponsored credits then simply add the
                sponsors wallet address and upload easily after the quick setup
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 text-muted-foreground">Turbo SDK</td>
              <td className="border border-border p-3 text-muted-foreground">
                Use the <code className="bg-muted px-1 rounded-xs">paidBy</code> option with the sponsor’s wallet
                address. See info below
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 text-muted-foreground">HTTP API</td>
              <td className="border border-border p-3 text-muted-foreground">
                Set <code className="bg-muted px-1 rounded-xs">x-paid-by</code> header to the sponsor’s wallet address.
                See info below
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Step-by-Step Guide</h2>
        <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Option 1: Using Turbo CLI</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-muted-foreground">
          <li>
            <strong>Install Turbo CLI</strong>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">npm install -g @ardrive/turbo-sdk</code>
              </pre>
              <button
                onClick={() => copyToClipboard("npm install -g @ardrive/turbo-sdk")}
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Get Your Arweave Wallet</strong>
            <p className="my-2">
              Download and save your wallet key file (e.g.,{" "}
              <code className="bg-muted px-1 rounded-xs">wallet.json</code>) securely.
            </p>
          </li>
          <li>
            <strong>Upload a File</strong>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">
                  turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json
                </code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard("turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json")
                }
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              This will automatically use any available sponsored credits without needing extra setup.
            </p>
          </li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Option 2: Using Turbo SDK (Node.js)</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-muted-foreground">
          <li>
            <strong>Install SDK</strong>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">npm install @ardrive/turbo-sdk</code>
              </pre>
              <button
                onClick={() => copyToClipboard("npm install @ardrive/turbo-sdk")}
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Example Upload Script</strong>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">{`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const turbo = TurboFactory.authenticated({ signer });
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const fileSize = fs.statSync(filePath).size;
const { id } = await turbo.uploadFile({
  fileStreamFactory: () => fs.createReadStream(filePath),
  fileSizeFactory: () => fileSize,
  dataItemOpts: {
    tags: [{ name: "Content-Type", value: "image/jpeg" }],
    paidBy: "SPONSOR_WALLET_ADDRESS",
  },
});
console.log("Upload successful! ID:", id);
})();
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const turbo = TurboFactory.authenticated({ signer });
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const fileSize = fs.statSync(filePath).size;
const { id } = await turbo.uploadFile({
  fileStreamFactory: () => fs.createReadStream(filePath),
  fileSizeFactory: () => fileSize,
  dataItemOpts: {
    tags: [{ name: "Content-Type", value: "image/jpeg" }],
    paidBy: "SPONSOR_WALLET_ADDRESS",
  },
});
console.log("Upload successful! ID:", id);
})();
`)
                }
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              Replace <code className="bg-muted px-1 rounded-xs">"SPONSOR_WALLET_ADDRESS"</code> with your sponsor’s
              actual wallet address.
            </p>
          </li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">Option 3: Using HTTP API</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-muted-foreground">
          <li>
            <strong>Prepare Your Data Item</strong>
            <p className="my-2">
              Use <code className="bg-muted px-1 rounded-xs">@dha-team/arbundles</code> and Turbo’s signer to create and
              sign your data.
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">{`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`)
                }
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Make the Upload Request</strong>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-xs overflow-x-auto">
                <code className="text-foreground">{`const response = await fetch("https://upload.ardrive.io/v1/tx", {
method: "POST",
headers: {
  "Content-Type": "application/octet-stream",
  Accept: "application/json",
  "x-paid-by": "SPONSOR_WALLET_ADDRESS",
},
body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`const response = await fetch("https://upload.ardrive.io/v1/tx", {
method: "POST",
headers: {
  "Content-Type": "application/octet-stream",
  Accept: "application/json",
  "x-paid-by": "SPONSOR_WALLET_ADDRESS",
},
body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`)
                }
                className="absolute top-2 right-2 text-foreground hover:text-muted-foreground transition-colors rounded-xs"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              Adding the <code className="bg-muted px-1 rounded-xs">x-paid-by</code> header tells ArDrive to use
              sponsored credits.
            </p>
          </li>
        </ol>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Resources</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
          <li>
            <strong>Full Turbo CLI / SDK / API Docs</strong>: Check{" "}
            <a
              href="https://docs.ardrive.io/docs/turbo/turbo-sdk/"
              className="text-primary underline hover:text-primary/80"
            >
              Turbo Documentation
            </a>
          </li>
          <li>
            <strong>Email support</strong>:{" "}
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqVsmVCqFrJFNLRZsrWQMfmVkQdrKWJfLwJkfkpmtcBzFMsBqGWGFRhXrDqLqXtsfBpTm"
              className="text-primary underline hover:text-primary/80"
            >
              nityaprotocol@gmail.com
            </a>
          </li>
          <li>
            <strong>Join our Discord Community</strong> for help
          </li>
          <li>
            <strong>Beta Notice</strong>: This is a beta tool. Expect updates.
          </li>
        </ul>
      </div>
    </div>
  )
}
