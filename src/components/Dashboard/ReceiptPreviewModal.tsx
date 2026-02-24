// src/components/ReceiptPreviewModal.tsx
import { useReceiptPreview } from '../../hooks/useTransaction';

interface ReceiptPreviewModalProps {
  transactionId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptPreviewModal = ({
  transactionId,
  isOpen,
  onClose,
}: ReceiptPreviewModalProps) => {
  const { data: html, isLoading } = useReceiptPreview(transactionId, {
    enabled: isOpen && !!transactionId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Receipt Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {isLoading ? (
            <div className="p-8 text-center">Loading receipt...</div>
          ) : (
            <iframe
              srcDoc={html}
              title="Receipt Preview"
              className="w-full h-[800px] border-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};