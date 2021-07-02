import Router from "next/router"

export const redirect = (url: string, ctx?: any | undefined): void => {
  if (typeof ctx === "undefined") {
    Router.push(url);
  } else {
    const { res } = ctx;
    if (res) {
      res.writeHead(302, { Location: url })
      res.end();
    } else {
      Router.push(url)
    }
  }
}
