import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import rootLayout from '../components/layout';
import '../src/app/globals.css'
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
 
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => rootLayout({ page }));
 
  return <html className={lexend.className}>{getLayout(<Component {...pageProps} />)}</html>;
}
export default App;