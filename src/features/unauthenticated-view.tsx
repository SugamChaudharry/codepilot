"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function UnauthenticatedView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Authentication required
          </CardTitle>
          <CardDescription>
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <SignInButton mode="redirect">
            <Button className="w-full">Sign In</Button>
          </SignInButton>

          <SignUpButton mode="redirect">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );
}
