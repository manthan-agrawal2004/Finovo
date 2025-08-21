"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"

export function ClerkThemeProvider({ children }) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
          borderRadius: "0.75rem",
          colorBackground: theme === "dark" ? "#0f172a" : "#ffffff",
          colorText: theme === "dark" ? "#f1f5f9" : "#111827",
        },
        elements: {
          // Card
          card:
            "rounded-2xl shadow-xl border border-gray-200/20 " +
            (theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
              : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900"),

          // Headings
          headerTitle: "text-2xl font-bold text-center",
          headerSubtitle: "text-sm text-gray-500 dark:text-gray-400 text-center mb-4",

          // Google button
          socialButtonsBlockButton__google:
            "w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 " +
            "bg-white text-gray-800 hover:bg-gray-50 transition font-medium shadow-sm",
          socialButtonsBlockButtonText: "text-sm font-medium",

          // Inputs
          formFieldInput:
            "w-full px-4 py-2 rounded-lg border border-gray-300 " +
            "bg-gray-50 dark:bg-gray-800 dark:border-gray-700 " +
            "text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500",

          // Primary button
          formButtonPrimary:
            "w-full rounded-lg py-2 font-semibold transition " +
            "bg-gradient-to-r from-purple-600 to-indigo-600 text-white " + 
            "hover:from-purple-700 hover:to-indigo-700 shadow-lg " +
            "disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none",

          // Footer
          footerActionLink: "text-purple-600 hover:underline font-medium dark:text-purple-400",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}