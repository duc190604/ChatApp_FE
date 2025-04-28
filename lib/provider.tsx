"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/lib/queryProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryProvider>{children}</QueryProvider>
      </Provider>
    </SessionProvider>
  );
}
