import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import AnchorLink from 'react-anchor-link-smooth-scroll'
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
import styles from  './nav.module.scss';

class Nav extends React.Component {
   constructor(props) {
      super(props);
      this.state = {addClass: false}
    }
    toggle() {
      this.setState({addClass: !this.state.addClass});
    }
 
   render() {
      let boxClass = [" open"];
      if(this.state.addClass) {
        boxClass.push('close');
      }

     return (

      <nav className={styles.navContainer +  boxClass.join(' ')}>
         {/*<div onClick={this.toggle.bind(this)} id="menuToggle" className="button-container menu"> */}
         {/*   <span></span>*/}
         {/*   <span></span>*/}
         {/*   <span></span>*/}
         {/*</div>*/}

         <div className={styles.navContent}>
            <div className={styles.navContentBox}>
               <h3 className={styles.headingName}>
                  <Link className={styles.fontColor} href="/">
                        <span className={styles.mobileHeadingName}>LA</span>
                        <span className={styles.desktopHeadingName}>Luis Amador</span>
                  </Link>
               </h3>

               <div className={styles.headShot}>
                  <Link href="/">
                     <Image src={HeadShot} alt="Head Shot" width={310} height={310} />
                  </Link>
               </div>

               <ul className={styles.navLists}>
                 <li className={styles.navList}>
                   <Link href="/" aria-label="Home">
                     <span className={styles.mobileMenuName}><HomeIcon fontSize="large" /></span>
                     <span className={styles.desktopMenuName}>Home</span>
                   </Link>
                 </li>

                  <li className={styles.navList}>
                     <AnchorLink href="#about-me" aria-label="About Me">
                           <span className={styles.mobileMenuName}><PersonIcon fontSize="large" /></span>
                           <span className={styles.desktopMenuName}>About Me</span>
                     </AnchorLink>
                  </li>

                  <li className={styles.navList}>
                     <AnchorLink href="#skills" aria-label="Skills">
                           <span className={styles.mobileMenuName}><InfoIcon fontSize="large" /></span>
                           <span className={styles.desktopMenuName}>My Expertise</span>
                     </AnchorLink>
                  </li>

                  <li className={styles.navList}>
                     <AnchorLink href="#projects" aria-label="Projects">
                           <span className={styles.mobileMenuName}><WorkIcon fontSize="large" /></span>
                           <span className={styles.desktopMenuName}>Projects</span>
                     </AnchorLink>
                  </li>

                  <li className={styles.navList}>
                     <AnchorLink href="#blog" aria-label="Blog">
                           <span className={styles.mobileMenuName}><TimelineIcon fontSize="large" /></span>
                           <span className={styles.desktopMenuName}>Blog</span>
                     </AnchorLink>
                  </li>

                  <li className={styles.navList}>
                     <AnchorLink href="#contact-me" aria-label="Contact Me">
                           <span className={styles.mobileMenuName}><ContactMailIcon fontSize="large" /></span>
                           <span className={styles.desktopMenuName}>Contact Me</span>
                     </AnchorLink>
                  </li>
               </ul>

               <div className={styles.socialContainer}>
                  <ul className={styles.socialLists}>
                  <li className={styles.socialList + " " + styles.iconLinkedin}>
                     <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mrluisamador" aria-label="LinkedIn"><LinkedInIcon id="linkedin" fontSize="large" /></a>
                  </li>

                  <li className={styles.socialList + " " + styles.iconTwitter}>
                     <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/mrluisamador" aria-label="Twitter"><TwitterIcon id="twitter" fontSize="large" /></a>
                  </li>

                  <li className={styles.socialList + " " + styles.iconGithub}>
                     <a target="_blank" rel="noopener noreferrer" href="https://github.com/MrLuisAmador" aria-label="Github"><CodeIcon id="github" fontSize="large" /></a>
                  </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>     
     );
   }
 }

export default Nav