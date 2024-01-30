import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./component/layouts/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />;
    </>
  )
}
