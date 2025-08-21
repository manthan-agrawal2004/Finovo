import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-10 px-5 py-6">
      {/* Header Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white capitalize">
              {account.name}
            </h1>
            <p className="mt-2 text-sm text-pink-100">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </p>
          </div>

          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              ${parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-pink-100">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-2xl shadow-md overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full flex flex-col items-center mt-16 space-y-4">
              {/* Animated Gradient Loader */}
              <div className="w-3/4 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <div className="h-full w-full animate-progress bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading chart...
              </p>
            </div>
          }
        >
          <AccountChart transactions={transactions} />
        </Suspense>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl shadow-md overflow-hidden bg-white dark:bg-gray-900 p-4">
        <Suspense
          fallback={
            <div className="w-full flex flex-col items-center mt-16 space-y-4">
              {/* Animated Gradient Loader */}
              <div className="w-3/4 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <div className="h-full w-full animate-progress bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading transactions...
              </p>
            </div>
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}