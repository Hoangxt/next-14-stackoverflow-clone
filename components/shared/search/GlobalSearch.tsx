"use client";

import { useEffect, useRef, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("global");

  // state
  const [search, setSearch] = useState(query || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // close modal useEffect
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsModalOpen(false);
        setSearch("");
      }
    };

    setIsModalOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search, router, pathname, searchParams]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular text-dark400_light700 no-focus placeholder  background-light800_darkgradient border-none shadow-none outline-none"
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isModalOpen) {
              setIsModalOpen(true);
            }
            if (e.target.value === "" && isModalOpen) {
              setIsModalOpen(false);
            }
          }}
        />
      </div>
      {isModalOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
