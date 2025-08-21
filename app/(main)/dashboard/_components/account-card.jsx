"use client";

import { ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/90 via-purple-500/80 to-pink-500/90 text-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>

        <Link href={`/account/${id}`} className="relative z-10 block">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold capitalize">
              {name}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isDefault && <Badge className="bg-white/20">Default</Badge>}

              {updateDefaultLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <Switch
                  checked={isDefault}
                  onClick={handleDefaultChange}
                  disabled={updateDefaultLoading}
                />
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              ${parseFloat(balance).toFixed(2)}
            </div>
            <p className="text-xs text-white/80">
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-white/80">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-300" />
              Income
            </div>
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-300" />
              Expense
            </div>
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
}