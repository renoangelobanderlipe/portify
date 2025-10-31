"use client";

import { SpinningText } from "@/components/ui/spinning-text";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SpinningText>learn more • play more • grow more •</SpinningText>
    </div>
  );
}
