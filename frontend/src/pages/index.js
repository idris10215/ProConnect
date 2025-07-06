import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  return (
    <>
      <Head>
        <title>ProConnect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <h2> Hello World</h2>
        </main>
        
    </>
  );
}
