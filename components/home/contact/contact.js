import styles from "./contact.module.scss";

const Contact = () => {
    async function handleOnSubmit() {
        const formData = {}

        Array.from(e.currentTarget.elements).forEach(field => {
            if ( !field.name ) return;
            formData[field.name] = field.value;
        });

        fetch('/api/mail',{
            method: 'post',
            body: JSON.stringify(formData)
        });
    }

    return (
        <section id="contact-me" className={styles.contactMe + " scrollto"}>
            <div className={styles.contact}>
                <h1 className={styles.contactMeTitle}>Want to work together?</h1>

                <p className={styles.contactMeText}>
                    I’m currently accepting new projects and would love to hear about yours. Please take a few minutes to tell me about it.
                </p>

                <form
                  name={styles.contactMe}
                  method="post"
                  onSubmit={handleOnSubmit}
                >

                    <div className={styles.nameFieldContainer}>
                        <input
                           required="required"
                           maxLength="20"
                           minLength="2"
                           type="text"
                           name="name"
                           size="40"
                           className={styles.formControlWrapInput}
                           id="your-name"
                           placeholder="Name"
                           autoComplete="off"
                           aria-label="Name"
                        />
                    </div>

                    <div className={styles.emailFieldContainer}>
                        <input
                           required="required"
                           type="email"
                           name="email"
                           size="40"
                           className={styles.formControlWrapInput}
                           id="email"
                           placeholder="Email"
                           autoComplete="off"
                           aria-label="Email"
                        />
                    </div>

                    <div className={styles.subjectFieldContainer}>
                        <input
                            required="required"
                            maxLength="20"
                            minLength="2"
                            type="text"
                            name="subject"
                            size="40"
                            className={styles.formControlWrapInput}
                            id="subject"
                            placeholder="Subject"
                            autoComplete="off"
                            aria-label="Subject"
                         />

                    </div>

                    <div className={styles.textareaFieldContainer}>
                        <textarea
                          minLength="20"
                          required="required"
                          id="area" 
                          name="message"
                          cols="40"
                          rows="10"
                          className={styles.formControlWrapTextArea}
                          placeholder="Let's Talk! Tell me about your project..."
                          autoComplete="off"
                          aria-label="Enter your comment"
                        >
                        </textarea>
                    </div>

                    <div className={styles.submitFieldContainer}>
                        <input id="submit" type="submit" value="Send It!" className={styles.formControlWrapSubmit} />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact
