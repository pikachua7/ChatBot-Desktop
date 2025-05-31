// pages/_app.tsx
import "./globals.css"; // or wherever your CSS file is located
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
