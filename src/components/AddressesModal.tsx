import { X, ClipboardPenIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Pool } from "../types/types"

interface AddressesModalProps {
  isOpen: boolean
  pool: Pool | null
  onClose: () => void
  onCopyAddress: (address: string) => void
}

export default function AddressesModal({ isOpen, pool, onClose, onCopyAddress }: AddressesModalProps) {
  if (!isOpen || !pool) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-snow-drift border rounded-xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Whitelisted Addresses ({pool.addresses.length})
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {pool.addresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border-2 border-gray-300 p-4 rounded-xl"
            >
              <span className="text-sm break-all">{address}</span>
              <Button
                onClick={() => onCopyAddress(address)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-xl text-sm font-medium transition-colors ml-4 flex-shrink-0"
              >
                <ClipboardPenIcon className="w-4 h-4" />
                Copy
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}