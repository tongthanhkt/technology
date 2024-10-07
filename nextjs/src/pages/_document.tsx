import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script"; // Import Script from next/script
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
