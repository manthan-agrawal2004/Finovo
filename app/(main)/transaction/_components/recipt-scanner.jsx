"use client";

import { useRef, useEffect } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";
import { motion } from "framer-motion";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    await scanReceiptFn(file);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]); // ✅ fixed

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full"
      >
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl font-medium text-white shadow-lg bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={scanReceiptLoading}
        >
          {scanReceiptLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Scanning Receipt...</span>
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              <span>Scan Receipt with AI</span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}