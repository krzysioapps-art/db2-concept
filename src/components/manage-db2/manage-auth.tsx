"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const MANAGE_AUTH_KEY =
  "db2-manage-auth";

export function ManageAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [checked, setChecked] =
    useState(false);

  useEffect(() => {
    const authenticated =
      sessionStorage.getItem(
        MANAGE_AUTH_KEY
      ) === "true";

    if (!authenticated) {
      router.replace(
        `/manage-db2/login?next=${encodeURIComponent(
          pathname
        )}`
      );

      return;
    }

    setChecked(true);
  }, [pathname, router]);

  if (!checked) {
    return null;
  }

  return children;
}