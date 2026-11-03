'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  // On the server: a fresh cache for every request, so users never share data.
  if (typeof window === "undefined") return new QueryClient();
  // In the browser: create the cache once and reuse it.
  browserQueryClient ??= new QueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}