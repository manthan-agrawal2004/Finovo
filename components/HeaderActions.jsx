
"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toogle";

const HeaderActions = () => {
  return (
    <div className="flex items-center space-x-4">
      <SignedIn>
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
        </Link>
        <Link href="/transaction/create">
          <Button className="flex items-center gap-2">
            <PenBox size={18} />
            <span className="hidden md:inline">Add Transaction</span>
          </Button>
        </Link>
      </SignedIn>

      <SignedOut>
        <SignInButton forceRedirectUrl="/dashboard">
          <Button variant="outline">Login</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: { avatarBox: "w-10 h-10" },
          }}
        />
      </SignedIn>

      {/* Dark/Light Mode Toggle */}
      <ModeToggle />
    </div>
  );
};

export default HeaderActions;