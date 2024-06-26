import {headers} from 'next/headers'
import {redirect} from 'next/navigation'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contact | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog',
}

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
    }

    await fetch(urlPath + '/api', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form submission response:', data)
      })
      .catch((error) => {
        console.error('Form submission error:', error)
        return
      })

    redirect('/thankyou')
  }

  return (
    <section className="h-screen items-center flex justify-center text-white py-16 bg-contact-blue px-5">
      <div className="md:w-3/6">
        <h1 className="text-4xl mb-5 text-center">Do you need something done?</h1>
        <p className="mb-14 text-lg text-center">
          I&apos;m currently accepting new projects and would love to help with yours. Please take a
          few minutes and tell me how I can help.
        </p>

        <form action={create} id="mail" className="mail">
          <label className="">
            <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">
              What service do you need done?
            </span>
            <textarea
              minLength={20}
              required={true}
              id="message"
              name="message"
              cols={40}
              rows={10}
              className="w-full bg-[#053c50] text-xl mb-2.5 p-2.5 border-none rounded h-12 min-h-[250px]"
              placeholder="What service do you need done?"
              autoComplete="off"
              aria-label="Enter your comment"
            ></textarea>
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
}

export default Contact
