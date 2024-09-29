"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as ColorProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import type { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ColorProvider {...props}>{children}</ColorProvider>;
};

export { AuthProvider, ThemeProvider };
