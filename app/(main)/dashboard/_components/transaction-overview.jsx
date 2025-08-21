"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="relative overflow-hidden rounded-2xl border border-pink-500/20 shadow-lg bg-gradient-to-br from-pink-500/10 via-orange-500/10 to-red-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
            <CardTitle className="text-base font-semibold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Recent Transactions
            </CardTitle>
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No recent transactions
                </p>
              ) : (
                recentTransactions.map((transaction, idx) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between rounded-lg p-3 hover:bg-white/30 dark:hover:bg-black/30 transition"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "PP")}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center font-semibold",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      ${transaction.amount.toFixed(2)}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Breakdown Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-lg bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-indigo-500/10">
          <CardHeader className="px-4 pb-2">
            <CardTitle className="text-base font-semibold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Monthly Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-5">
            {pieChartData.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No expenses this month
              </p>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false} 
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.6; 
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-sm font-semibold"
                          >
                           
                            {`$${value.toFixed(2)}`}
                            
                          </text>
                        );
                      }}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const { name, value } = payload[0];
                          return (
                            <div className="rounded-lg px-3 py-2 shadow-md bg-gradient-to-br from-pink-500/90 via-orange-500/90 to-red-500/90 text-white text-xs font-medium backdrop-blur-sm">
                              {name}: ${value.toFixed(2)}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}