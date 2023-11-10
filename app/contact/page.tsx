import { headers } from 'next/headers'
import { redirect } from "next/navigation";

const Contact = () => {
  async function create(formData: FormData) {
    'use server'

    const urlHeader = headers()
    const urlPath = urlHeader.get('referer')

    let data: any = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    await fetch(urlPath + '/api', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => {
      console.log('Form submission response:', data);
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      return
    });

    redirect('/thankyou')
  }

return (
    <section id="contact-me" className="h-full flex justify-center text-white py-16">
        <div className="w-4/5 lg:w-2/5">
            <h1 className="text-4xl mb-10 text-center">Want to work together?</h1>
            <p className="mb-14 text-lg">I&apos;m currently accepting new projects and would love to hear about yours. Please take a few minutes to tell me about it.</p>

            <form
                action={create}
                id="mail"
                className="mail"
            >
                <label className="">
                    <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Name</span>
                    <input
                       className="w-full bg-[#053c50] text-xl mb-2.5 pl-2.5 border-none rounded h-12"
                  
                       type="text"
                       name="name"
                       size={40}
                       id="name"
                       placeholder="Name"
                       autoComplete="off"
                    />
                </label>
                <label className="">
                    <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Email</span>
                    <input
                       required={true}
                       type="email"
                       name="email"
                       size={40}
                       className="w-full bg-[#053c50] text-xl mb-2.5 pl-2.5 border-none rounded h-12"
                       id="email"
                       placeholder="Email"
                       autoComplete="off"
                    />
                </label>
                <label className="">
                    <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Subject</span>
                    <input
                        required={true}
                        maxLength={20}
                        minLength={2}
                        type="text"
                        name="subject"
                        size={40}
                        className="w-full bg-[#053c50] text-xl mb-2.5 pl-2.5 border-none rounded h-12"
                        id="subject"
                        placeholder="Subject"
                        autoComplete="off"
                        aria-label="Subject"
                     />
                </label>
                <label className="">
                    <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Enter your comment</span>
                    <textarea
                      minLength={20}
                      required={true}
                      id="message" 
                      name="message"
                      cols={40}
                      rows={10}
                      className="w-full bg-[#053c50] text-xl mb-2.5 p-2.5 border-none rounded h-12 min-h-[250px]"
                      placeholder="Let's Talk! Tell me about your project..."
                      autoComplete="off"
                      aria-label="Enter your comment"
                    >
                    </textarea>
                </label>
                <label className="">
                    <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Submit</span>
                    <input 
                        id="submit" 
                        type="submit" 
                        value="Send It!" 
                        className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[50%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors cursor-pointer" 
                    />
                </label>
            </form>
        </div>
    </section>
  )
};

export default Contact;