import { useEffect } from "react";
import Router from "next/router"

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
  user = false,
} = {}) {
  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])
}
