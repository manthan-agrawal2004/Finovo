"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white dark:from-gray-950 dark:via-black dark:to-black pt-32 pb-20">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-120px] w-[320px] h-[320px] bg-pink-300 dark:bg-pink-800 rounded-full blur-[180px] opacity-40" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[380px] h-[380px] bg-orange-200 dark:bg-orange-700 rounded-full blur-[200px] opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Take Control of Your{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                Money
              </span>{" "}
              with Finovo
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
              Simplify budgeting, track spending, and achieve your financial goals
              with AI-driven insights designed for everyday life.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-90 transition rounded-2xl shadow-lg"
                >
                  🌟 Start Free
                </Button>
              </Link>
              
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Image
              src={"/hero.png"|| ""}
              width={1200}
              height={700}
              alt="Finovo Dashboard"
              className="rounded-2xl shadow-2xl border mx-auto"
              priority
            />
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-orange-400 opacity-20 blur-3xl rounded-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;