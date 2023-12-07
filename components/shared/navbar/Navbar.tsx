import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
// background-light900_dark200
const Navbar = () => {
  // const isLogged = false;

  return (
    <nav className="bg-light-900 dark:bg-dark-200 flex justify-between items-center fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="Dev"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      GlobalSearch
      <div className="flex justify-between items-center gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        MobileNav
      </div>
    </nav>
  );
};

export default Navbar;
