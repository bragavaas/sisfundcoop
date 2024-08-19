// 1. import `NextUIProvider` component
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <SessionProvider navigate={router.push}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;