import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* Light/Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-orange-50 dark:from-gray-950 dark:via-black dark:to-gray-900" />

      {/* Subtle grid overlay (like your previous version) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-12">
        <div className="flex justify-center md:justify-normal mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Add Transaction
          </h1>
        </div>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    </div>
  );
}