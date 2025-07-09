import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

function NavbarComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1 className={styles.logo} onClick={() => {
            router.push("/");
        }}> Proconnect</h1>

        <div className={styles.navBarOptionsContainer}>
          <div
            onClick={() => {
              router.push("/login");
            }}
            className={styles.buttonJoin}
          >
            <p> Be a Part </p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
