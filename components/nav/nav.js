"use client"

import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import HeadShot from '/public/images/mugshot.png'

export default function Nav() {
   return (
      <nav className="lg:px-[20px] overflow-y-scroll z-[1] right-0 h-full fixed w-[70px] lg:w-[350px] bg-dark-grey">
         {/*<div onClick={this.toggle.bind(this)} id="menuToggle" className="button-container menu"> */}
         {/*   <span></span>*/}
         {/*   <span></span>*/}
         {/*   <span></span>*/}
         {/*</div>*/}

         <div className="flex items-center text-white">
            <div className="w-full">
               <h3 className="text-center text-3xl mt-12 mb-7">
                  <Link className="block" href="/">
                        <span className="lg:hidden">LA</span>
                        <span className="hidden lg:block">Luis Amador</span>
                  </Link>
               </h3>

               <div className="">
                  <Link className="block" href="/">
                     <Image className="block" src={HeadShot} alt="Head Shot" width={310} height={310} />
                  </Link>
               </div>

               <ul className="mt-4 mb-4 text-center border-t-[1px] border-t-[#ddd] border-b-[1px] border-b-[#ddd] pt-5 pb-5 lg:pt-0 lg:border-none">
                 <li className="mb-3.5">
                   <Link className="block" href="/" aria-label="Home">
                     <span className="lg:hidden"><HomeIcon fontSize="large" /></span>
                     <span className="hidden lg:block">Home</span>
                   </Link>
                 </li>

                  <li className="mb-3.5">
                     <Link className="block" href="/about" aria-label="About Me">
                           <span className="lg:hidden"><PersonIcon fontSize="large" /></span>
                           <span className="hidden lg:block">About Me</span>
                     </Link>
                  </li>

                  <li className="mb-3.5">
                     <Link className="block" href="/skills" aria-label="Skills">
                           <span className="lg:hidden"><InfoIcon fontSize="large" /></span>
                           <span className="hidden lg:block">My Expertise</span>
                     </Link>
                  </li>

                  <li className="mb-3.5">
                     <Link className="block" href="/projects" aria-label="Projects">
                           <span className="lg:hidden"><WorkIcon fontSize="large" /></span>
                           <span className="hidden lg:block">Projects</span>
                     </Link>
                  </li>

                  {/* <li className="mb-3.5">
                     <Link className="block" href="/blog" aria-label="Blog">
                           <span className="lg:hidden"><TimelineIcon fontSize="large" /></span>
                           <span className="hidden lg:block">Blog</span>
                     </Link>
                  </li> */}

                  <li className="">
                     <Link className="block" href="/contact" aria-label="Contact Me">
                           <span className="lg:hidden"><ContactMailIcon fontSize="large" /></span>
                           <span className="hidden lg:block">Contact Me</span>
                     </Link>
                  </li>
               </ul>

               <div className="mb-4">
                  <ul className="lg:flex lg:justify-center">
                     <li className="lg:mr-2.5 mb-2.5 lg:mb-0 text-center">
                        <Link className="block" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mrluisamador" aria-label="LinkedIn">
                           <LinkedInIcon className="transition-colors hover:text-linkedin-blue" id="linkedin" fontSize="large" />
                        </Link>
                     </li>

                     <li className="lg:mr-2.5 mb-2.5 lg:mb-0  text-center">
                        <Link className="block" target="_blank" rel="noopener noreferrer" href="https://twitter.com/LinuxLue" aria-label="Twitter">
                           <TwitterIcon className="transition-colors hover:text-twitter-blue" id="twitter" fontSize="large" />
                        </Link>
                     </li>

                     <li className="text-center">
                        <Link className="block" target="_blank" rel="noopener noreferrer" href="https://github.com/MrLuisAmador" aria-label="Github">
                           <CodeIcon className="transition-colors hover:text-github-orange" id="github" fontSize="large" />
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>     
   )
}
