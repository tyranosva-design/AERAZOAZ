'use client';

import React from 'react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto border-2 border-black p-6 space-y-4 my-12 text-center">
      <h2 className="text-xl font-bold uppercase">AERAZOAZ — Page Error</h2>
      <p className="text-sm text-zinc-700">An unexpected error occurred while loading this view.</p>
      <button
        onClick={() => reset()}
        className="bg-black text-white px-4 py-2 font-bold text-xs uppercase"
      >
        Reload View
      </button>
    </div>
  );
}
