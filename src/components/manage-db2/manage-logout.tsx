"use client";

import { useRouter } from "next/navigation";

import { MANAGE_AUTH_KEY } from "./manage-auth";

export function ManageLogout() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem(
      MANAGE_AUTH_KEY
    );

    router.replace("/manage-db2/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
    >
      Wyloguj
    </button>
  );
}