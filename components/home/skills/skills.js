import styles from "./skills.module.scss";

const Skills = () => (
    <section id="skills" className={styles.skills + " scrollto"}>
        <h1 className={styles.blogTitle}>My Expertise</h1>

        <div className={styles.skillsWrapper}>
            <div className={styles.skillsInnerWrap}>
                <h1 className={styles.skillsTitle}>Performance</h1>

                <div className={styles.skillsContent}>
                <p>Website performance should be high on any list. It’s a major consideration of how Google Search ranks
                    it. Slow websites will be penalized if it doesn’t perform at Google preferred guidelines. Google will
                    rank better performance websites at a higher search result and place slower site lower. I take on the
                    best approaches to making sure a website ends back up on Google Search good side by auditing and
                    fixing whatever is causing the poor performance. </p>
                </div>
            </div>


            <div className={styles.skillsInnerWrap}>
                <h1 className={styles.skillsTitle}>SEO</h1>

                <div className={styles.skillsContent}>
                <p>What Good is a Beautiful Website if it Doesn’t drive in traffic? Your website should not only look
                    good, but it should also be wired up for SEO. This is something that should not be skipped. With my
                    SEO experience I will make sure that you don’t. Using the best SEO practices is what will
                    differentiate a website from the rest. </p>
                </div>
            </div>


            <div className={styles.skillsInnerWrap}>
                <h1 className={styles.skillsTitle}>Support or Enhancements</h1>

                <div className={styles.skillsContent}>
                <p>Support and Enhancements differs from Maintenance. If requiring just a single task, I will handle any
                    Support and Enhancements as specified. It could be a task that requires a fix, or an Enhancement that
                    you would like to add in, or an fix/update you would like to make on a live current page. I will
                    assure these items are applied in a timely matter.</p>
                </div>
            </div>


            <div className={styles.skillsInnerWrap}>
                <h1 className={styles.skillsTitle}>Maintenance</h1>

                <div className={styles.skillsContent}>
                <p>Maintenance is a free for all. You get a fixed amount of time per month to have me apply all or any
                    of my expertise skill set at whatever task you need done. The task at hand will be estimated and
                    agreed upon before being executed. You will alway get an extra default of 2.5 hours aside from your
                    fixed monthly hours. Those 2.5 hours of time will be used to make sure the website is backed up and up
                    to date with security patches. You will also be notified of any issues that need attention. Think of
                    the Maintenance as your comfort zone knowing that I will be there at your will.</p>
                </div>
            </div>
        </div>
    </section>
)

export default Skills