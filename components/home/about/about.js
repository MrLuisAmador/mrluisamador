import styles from "./about.module.scss";

const About = () => (
    <section id="about-me" className={styles.aboutMe + " scrollto"}>
        <div className={styles.aboutMeWrapper}>
            <div className={styles.aboutMeContent}>
                <h1 className={styles.aboutMeTitle}>About Me</h1>

                <p>Hello and welcome! I’m Luis Amador. I primarily focus on trying to drive the web forward. I believe
                that goal is best met by leading the field in SEO, Performance, Security and Website Maintenance. Those
                are the major players of a successful website, so this is my driving force. I’m not only a web
                developer, I’m also a Linux Administrator. Jumping on a terminal to monitor a website security and
                health is something I take seriously. I love taking on new challenges so please shoot me an email if you
                would like to hire and include me in your project.</p>

                <p>Code speaks louder than words so keep scrolling down the page to see projects I have been a part of.
                </p>
            </div>
        </div>
    </section>
)

export default About