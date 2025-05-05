import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, PenBox } from "lucide-react";

import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";

const header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/">
          <Image
            src={"/logo2.jpg"}
            alt="WealthWise"
            width={90}
            height={200}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn >
            <Link href={"/dashboard"} className="flex text-gray-600 hover:text-blue-500 items-center gap-2">
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href={"/transaction/create"}>
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
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }} />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default header;
