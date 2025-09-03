import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Luis Amador website to showcase his skills and services he offers to businesses',
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  return (
    <section id="about-me" className="flex items-center justify-center px-5 py-16 text-text-grey">
      <div className="md:w-4/5">
        <div className="text-center">
          <h1 className="mb-16 text-4xl">About Me</h1>
          <p className="mb-12 text-lg">
            Hello and welcome! I'm Luis Amador. I've been developing for the web for almost a
            decade. I believe in setting higher standards by lending the field in SEO, performance,
            security, development and maintenance for websites. Those lists of attributes are a
            major player to a successful website. I am constantly chasing the newest technologies
            and best modern practices while sticking to solid fundamentals. This is what makes me
            stand out. I'm always growing my skills and knowledge while I also clearing out the
            technologies that come and go. I'm not only a web developer, I'm a father first. I have
            a passion for business, economics, financing and pretty much anything educational. I
            love to always learn and teach others where I can.
          </p>
        </div>

        <div className="mb-7">
          <h2 className="mb-5 text-2xl">
            Here's a list of the technologies I use on a consistent daily basis
          </h2>

          <div className="mb-5">
            <h3 className="text-xl">Languages:</h3>
            <ul>
              <li>HTML</li>
              <li>CSS | Sass | Less | Tailwindcss</li>
              <li>JavaScript | TypeScript</li>
              <li>Node.js</li>
              <li>SQL</li>
              <li>Markdown</li>
              <li>Bash</li>
              <li>Regular Expression</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">Platforms:</h3>
            <ul>
              <li>React | Next.js</li>
              <li>Wix</li>
              <li>AEM</li>
              <li>Adobe Commerce</li>
              <li>Shopify</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">Databases:</h3>
            <ul>
              <li>MySQL</li>
              <li>Postgress | SupaBase</li>
              <li>MongoDB</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">DevOps:</h3>
            <ul>
              <li>AWS</li>
              <li>Docker</li>
              <li>GitHub | Bitbucket | GitLab</li>
              <li>Linux</li>
              <li>CI/CD</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">Webmaster:</h3>
            <ul>
              <li>Google Analytics</li>
              <li>Google Webmaster Tools</li>
              <li>Domain Names (DNS)</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">Team Management:</h3>
            <ul>
              <li>Jira Scrum | Kanban</li>
              <li>Slack | Discord</li>
            </ul>
          </div>

          <div className="mb-5">
            <h3 className="text-xl">Misc:</h3>
            <ul>
              <li>Vim | Jetbrains | VSCode</li>
              <li>PhotoShop | Adobe XD | Figma | Sketch</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-1 text-2xl">Other Skills and Experiences:</h2>
          <ul>
            <li>Computer Repair and Software Support</li>
            <li>Mobile Phone Repairs </li>
            <li>Small Motor Mechanical Technician</li>
            <li>Bilingual</li>
            <li>Guitar Player</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
