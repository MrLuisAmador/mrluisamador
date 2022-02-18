import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import TimelineIcon from '@material-ui/icons/Timeline';
import WorkIcon from '@material-ui/icons/Work';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CodeIcon from '@material-ui/icons/Code';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

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
                  <Link href="/">
                     <a className={styles.fontColor}>
                        <span className={styles.mobileHeadingName}>LA</span>
                        <span className={styles.desktopHeadingName}>Luis Amador</span>
                     </a>
                  </Link>
               </h3>

               <div className={styles.headShot}>
                  <Link href="/">
                      <a>
                          <Image src={HeadShot} alt="Head Shot" width={310} height={310} />
                      </a>
                  </Link>
               </div>

               <ul className={styles.navLists}>
                 <li className={styles.navList}>
                   <Link href="/" aria-label="Home">
                     <a>
                         <span className={styles.mobileMenuName}><HomeIcon fontSize="large" /></span>
                         <span className={styles.desktopMenuName}>Home</span>
                     </a>
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