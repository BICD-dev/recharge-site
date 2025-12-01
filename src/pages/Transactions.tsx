import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTxns() {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    }
    fetchTxns();
  }, []);

  const filteredTxns = transactions.filter((txn) => {
    if (filter === "all") return true;
    return txn.status === filter;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-green-700">Transactions</h1>

      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="p-4 flex items-center gap-4">
          <Select onValueChange={(v) => setFilter(v)}>
            <SelectTrigger className="w-[200px] border-green-700 text-green-700">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-2xl shadow-md">
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="bg-green-700 text-white">
              <TableRow>
                <TableHead className="text-white">Reference</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTxns.length > 0 ? (
                filteredTxns.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.reference}</TableCell>
                    <TableCell>₦{txn.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          txn.status === "completed"
                            ? "bg-green-700 text-white"
                            : txn.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(txn.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
