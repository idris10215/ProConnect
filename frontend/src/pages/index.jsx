import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { Inter } from "next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });



export default function Home() {

  const router = useRouter();

  return (
    <>
     <div className={styles.container}>
      <div className={styles.mainContainer}>

        <div className={styles.mainContainer_left}>

          <p>Connect with friends without Exaggeration</p>
          <p> A true social media platform, with stories no blufs!</p>

          <div onClick={() => {

            router.push("/login")

          }} className={styles.buttonJoin}>
            <p> Join now </p>
          </div>

        </div>

        <div className={styles.mainContainer_right}>
          <img src="images/homemain_connection.jpg" />
        </div>

      </div>
     </div>
    </>
  );
}
