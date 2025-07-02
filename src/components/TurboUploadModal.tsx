import React, { useState } from 'react'
import { TurboFactory, ArconnectSigner } from '@ardrive/turbo-sdk/web'
import { X } from 'lucide-react'
import { useUser } from '../hooks/useUser'

interface TurboUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

const TurboUploadModal: React.FC<TurboUploadModalProps> = ({ isOpen, onClose }) => {
  const { connected } = useUser()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')

  if (!isOpen) return null

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadStatus('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first')
      return
    }

    if (!connected || !window.arweaveWallet) {
      setUploadStatus('Please connect your wallet first')
      return
    }

    try {
      setUploadStatus('Uploading...')
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({
        signer,
        token: 'arweave',
      })

      await turbo.uploadFile({
        fileStreamFactory: () => selectedFile.stream(),
        fileSizeFactory: () => selectedFile.size,
        events: {
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            const percentage = Math.round((processedBytes / totalBytes) * 100)
            setUploadStatus(`Upload progress: ${percentage}%`)
          },
          onUploadSuccess: () => setUploadStatus('Upload successful!'),
          onUploadError: (error) => setUploadStatus(`Upload error: ${error.message}`),
        },
      })
    } catch (error) {
      setUploadStatus(`Upload failed: ${(error as Error).message}`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Turbo Upload</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2">Select a file to upload</p>
            <input type="file" onChange={handleFileSelect} className="w-full" />
          </div>
          <button
            onClick={handleUpload}
            className="w-full bg-black text-white p-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Upload File
          </button>
          {uploadStatus && <p className="text-sm text-gray-600">{uploadStatus}</p>}
        </div>
      </div>
    </div>
  )
}

export default TurboUploadModal