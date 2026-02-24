import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { FiEye, FiDownload } from "react-icons/fi";
import { useWalletTransactions } from "@/hooks/useWallet";
import { useDownloadReceipt } from "@/hooks/useTransaction";
import { ReceiptPreviewModal } from "@/components/Dashboard/ReceiptPreviewModal";

type TransactionStatus = "pending" | "completed" | "failed" | "successful";

interface Transaction {
  id: number;
  reference: string;
  amount: string | number;
  status: TransactionStatus;
  purpose: string;
  created_at: string;
}

type FilterType = "all" | TransactionStatus;

export default function TransactionsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number>(0);

  const {
    data,
    isLoading,
    isError,
  } = useWalletTransactions();

  // Download receipt
  const downloadReceiptMutation = useDownloadReceipt();

  const handlePreview = (id: number) => {
    setSelectedTransactionId(id);
    setPreviewModalOpen(true);
  };

  const handleDownload = (id: number, reference: string) => {
    downloadReceiptMutation.mutate({ id, reference });
  };

  const handleClosePreview = () => {
    setPreviewModalOpen(false);
    setSelectedTransactionId(0);
  };

  // Normalize backend response structure
  const transactions: Transaction[] = Array.isArray(data?.data?.[0])
    ? data.data[0]
    : data?.data || [];

  const filteredTxns = transactions.filter((txn) =>
    filter === "all" ? true : txn.status === filter
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-3 w-full flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold text-green-700">Transactions</h1>

      {/* FILTER */}
      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="p-4 flex items-center gap-4">
          <Select 
            value={filter}
            onValueChange={(v: FilterType) => setFilter(v)}
          >
            <SelectTrigger className="w-[200px] border-green-700 text-green-700">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="successful">Successful</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="p-0 overflow-hidden">

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-center py-8">
              <p className="text-red-600">Failed to load transactions.</p>
            </div>
          )}

          {!isLoading && !isError && (
            <Table>
              <TableHeader className="bg-green-700 text-white">
                <TableRow>
                  <TableHead className="text-white">Reference</TableHead>
                  <TableHead className="text-white">Purpose</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTxns.length > 0 ? (
                  filteredTxns.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-mono text-xs">
                        {txn.reference}
                      </TableCell>

                      <TableCell className="capitalize">
                        {txn.purpose}
                      </TableCell>

                      <TableCell className="font-semibold">
                        ₦{typeof txn.amount === "string"
                          ? parseFloat(txn.amount).toLocaleString()
                          : txn.amount?.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            txn.status === "completed" || txn.status === "successful"
                              ? "bg-green-700 text-white"
                              : txn.status === "pending"
                              ? "bg-yellow-500 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        {txn.created_at
                          ? new Date(txn.created_at).toLocaleString()
                          : "—"}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handlePreview(txn.id)}
                            title="Preview Receipt"
                            className="hover:bg-green-50 hover:text-green-700"
                          >
                            <FiEye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDownload(txn.id, txn.reference)}
                            disabled={downloadReceiptMutation.isPending}
                            title="Download Receipt"
                            className="hover:bg-green-50 hover:text-green-700"
                          >
                            <FiDownload className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* RECEIPT PREVIEW MODAL */}
      <ReceiptPreviewModal
        transactionId={selectedTransactionId}
        isOpen={previewModalOpen}
        onClose={handleClosePreview}
      />
    </motion.div>
  );
}
