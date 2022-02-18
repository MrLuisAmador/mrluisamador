import styles from "./footer.module.scss";

const Footer = () => (
    <footer className={styles.footerContainer}>
        <div className={styles.copyright}>
          © <span className={styles.yearDate}>{new Date().getFullYear()}</span>
          <span> All Rights Reserved.</span>
          <a href="mailto:mrluisamador@gmail.com"> Luis Amador</a>
        </div>
    </footer>
)

export default Footer
