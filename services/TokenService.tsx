// @ts-nocheck
import Cookies from "universal-cookie"
import { redirect } from "./NavService";
import jwt from "jsonwebtoken"

export const saveToken = (token: string): Promise<void> => {
  const cookies = new Cookies();
  cookies.set("token", token, { path: "/" });
  return Promise.resolve();
}

export const getToken = (): string | undefined => {
  const cookies = new Cookies();
  return cookies.get("token");
}

export const getTokenFromCookie = (ctx: any): string => {
  const ssr = ctx.req ? true : false;
  const cookies = new Cookies(ssr ? ctx.req.headers.cookie : null);
  return cookies.get("token");
}

export const removeToken = (): Promise<void> => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  return Promise.resolve();
}

export const guestsOnly = (ctx: any): void => {
  const token = getTokenFromCookie(ctx);
  if (typeof token !== "undefined") {
    redirect("/login", ctx);
  }
};

export const membersOnly = (ctx) => {
  const token = getTokenFromCookie(ctx);
  if (typeof token === "undefined") {
    redirect("/login", ctx);
  } else {
    return jwt.verify(
      token.replace("Bearer ", ""),
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          redirect("/logout", ctx);
        }
      }
    );
  }
};
