import { FunctionComponent, ReactNode } from "react";
import styles from "./layout.module.css";
import Header from "../header";
import MenuBar from "../menu-bar";
import Partners from "../../partners";
import BgImage from "../../../assets/images/home/bg.svg";

interface LayoutProps {
  children: ReactNode;
  header?: boolean;
  menuBar?: boolean;
  partners?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  header,
  menuBar,
  partners,
}) => {
  return (
    <div className={`${styles.container}`}>
      {header && <Header />}
      <main className={styles.mainContent}>
        {menuBar && <MenuBar className={styles.menuBar} />}
        <section
          className={styles.pageContent}
          style={{
            backgroundImage: `url(${BgImage})`,
            aspectRatio: "1667/799",
            backgroundColor: "#000000",
          }}
        >
          {children}
        </section>
      </main>
      {partners && (
        <footer className={styles.footer}>
          <Partners />
        </footer>
      )}
    </div>
  );
};

export default Layout;
