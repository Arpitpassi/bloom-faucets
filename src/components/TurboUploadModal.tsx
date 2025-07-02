import { useState } from "react";
import { ArconnectSigner, TurboFactory } from "@ardrive/turbo-sdk/web";
import { useUser } from "../hooks/useUser.tsx";

export default function TurboUploadModal() {
  const { connected } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first");
      return;
    }

    if (!connected || !window.arweaveWallet) {
      setUploadStatus("Please connect your wallet first");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const signer = new ArconnectSigner(window.arweaveWallet);
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      });

      await turbo.uploadFile({
        fileStreamFactory: () => selectedFile.stream(),
        fileSizeFactory: () => selectedFile.size,
        events: {
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            const percentage = Math.round((processedBytes / totalBytes) * 100);
            setUploadStatus(`Upload progress: ${percentage}%`);
          },
          onUploadSuccess: () => setUploadStatus("Upload successful!"),
          onUploadError: (error) => {
            console.error("Upload error:", error);
            setUploadStatus(`Upload error: ${String(error)}`);
          },
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message.toLowerCase();
      } else if (typeof error === "string") {
        errorMessage = error.toLowerCase();
      }
      if (errorMessage.includes("permission") || errorMessage.includes("denied")) {
        setUploadStatus("Permission denied. Please reconnect your wallet and grant all requested permissions.");
      } else {
        setUploadStatus(`Upload failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="modal">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || !connected}>
        Upload File
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}