"use client";

import { ReactNode } from "react";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import UnauthenticatedView from "@/features/unauthenticated-view";
import AuthLoadingView from "@/features/auth-loading-view";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <header className="flex justify-end items-center p-4 h-16">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Authenticated>{children}</Authenticated>
          <Unauthenticated>
            <UnauthenticatedView />{" "}
          </Unauthenticated>
          <AuthLoading>
            <AuthLoadingView />
          </AuthLoading>
        </ConvexProviderWithClerk>
      </ThemeProvider>
    </ClerkProvider>
  );
}
