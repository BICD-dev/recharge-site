import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { getTransactionHistory } from "@/api/wallet";

// ----------------------------
// TYPES
// ----------------------------
type TransactionStatus = "pending" | "completed" | "failed" | "success";

interface Transaction {
  id: number;
  reference: string;
  amount: string | number;
  status: TransactionStatus;
  purpose: string;
  created_at: string; // Changed from Date to string since API returns ISO string
}

type FilterType = "all" | TransactionStatus;

export default function TransactionsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch function
  useEffect(() => {
    async function fetchTxns() {
      try {
        setLoading(true);
        const response = await getTransactionHistory();
        console.log("transaction history: ", response.data.data);
        
        // Handle the nested array structure from backend
        const txnData = response.data.data;
        const flattenedData = Array.isArray(txnData[0]) ? txnData[0] : txnData;
        
        setTransactions(flattenedData || []);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTxns();
  }, []);

  // Filter transactions based on selected filter
  const filteredTxns = transactions.filter((txn) => {
    if (filter === "all") return true;
    return txn.status === filter;
  });

  console.log("Filtered Transactions: ", filteredTxns);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-3 w-full flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold text-green-700">Transactions</h1>

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
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* TRANSACTIONS TABLE */}
      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="p-0 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-green-700 text-white">
                <TableRow>
                  <TableHead className="text-white">Reference</TableHead>
                  <TableHead className="text-white">Purpose</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTxns.length > 0 ? (
                  filteredTxns.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-mono text-xs">
                        {txn.reference}
                      </TableCell>
                      <TableCell className="capitalize">{txn.purpose}</TableCell>
                      <TableCell className="font-semibold">
                        ₦{typeof txn.amount === 'string' 
                          ? parseFloat(txn.amount).toLocaleString()
                          : txn.amount?.toLocaleString()
                        }
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                            txn.status === "completed" || txn.status === "success"
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}