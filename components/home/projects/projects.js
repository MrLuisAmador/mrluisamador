import React from "react";
import Image from 'next/image';
// import Isotope from "isotope-layout";
import styles from "./projects.module.scss";

import health from "/public/images/gme-healthquest-800x389.png"
import think from "/public/images/thinkdifferently.com-800x389.png"
import zaren from "/public/images/zarembabrown.com-800x389.png"
import westchester from "/public/images/westchesterbusinesscenter.com-800x389.png"
import suburban from "/public/images/suburbanpest.com-800x389.png"
import theBone from "/public/images/thebonecompany.com-800x389.png"
import bone from "/public/images/1-800dogbone.com-800x389.png"
import ossin from "/public/images/ossiningchildrenscenter.org-800x389.png"
import legal from "/public/images/legaleaseinc.com-800x389.png"
import kelly from "/public/images/kelly-ip.com-800x389.png"
import climb from "/public/images/climbleadership.com-800x389.png"
import luis from "/public/images/mrluisamador.com.png"
import bridge from "/public/images/bridgeprops.png"
import prim from "/public/images/primitivesbykathy.png"
import organ from "/public/images/organicpharmer.png"
import beauty from "/public/images/beautyplussalon.png"
import sim from "/public/images/simoneperele.png"
import julia from "/public/images/juliab.png"

const projectLists = [
    { id: 1, url: "https://gme.healthquest.org/", label: "gme.healthquest.org", filter: "filter-two", platform: "WordPress", image: health },
    { id: 2, url: "https://www.thinkdifferently.net/", label: "thinkdifferently.net", filter: "filter-two", platform: "WordPress", image: think },
    { id: 3, url: "http://www.zarembabrown.com/", label: "zarembabrown.com", filter: "filter-two", platform: "WordPress", image: zaren },
    { id: 4, url: "http://www.westchesterbusinesscenter.com/", label: "westchesterbusinesscenter.com", filter: "filter-three", platform: "Business Catalyst", image: westchester },
    { id: 5, url: "http://thebonecompany.com/", label: "thebonecompany.com", filter: "filter-two", platform: "WordPress", image: theBone },
    { id: 6, url: "http://suburbanpest.com/", label: "suburbanpest.com", filter: "filter-two", platform: "WordPress", image: suburban },
    { id: 7, url: "http://www.1-800dogbone.com/", label: "1-800dogbone.com", filter: "filter-two", platform: "WordPress", image: bone },
    { id: 8, url: "http://www.ossiningchildrenscenter.org/", label: "ossiningchildrenscenter.org", filter: "filter-three", platform: "Business Catalyst", image: ossin },
    { id: 9, url: "hhttp://www.legaleaseinc.com/", label: "legaleaseinc.com", filter: "filter-three", platform: "Business Catalyst", image: legal },
    { id: 10, url: "http://www.kelly-ip.com/", label: "kelly-ip.com", filter: "filter-three", platform: "Business Catalyst", image: kelly },
    { id: 11, url: "http://www.climbleadership.com/", label: "climbleadership.com", filter: "filter-three", platform: "Business Catalyst", image: climb },
    { id: 12, url: "http://www.mrluisamador.com/", label: "mrluisamador.com", filter: "filter-three", platform: "Gatsby", image: luis },
    { id: 13, url: "https://la.bridgeprops.com/", label: "la.bridgeprops.com", filter: "filter-one", platform: "Magento 1", image: bridge },
    { id: 14, url: "https://primitivesbykathy.com/", label: "primitivesbykathy.com", filter: "filter-one", platform: "Magento 1", image: prim },
    { id: 15, url: "https://www.organicpharmer.com/", label: "organicpharmer.com", filter: "filter-one", platform: "Magento 1", image: organ },
    { id: 16, url: "https://www.beautyplussalon.com/", label: "beautyplussalon.com", filter: "filter-one", platform: "Magento 1", image: beauty },
    { id: 17, url: "https://www.simoneperele.com/", label: "simoneperele.com", filter: "filter-one", platform: "Magento 1", image: sim },
    { id: 18, url: "https://juliab.com/", label: "juliab.com", filter: "filter-one", platform: "Magento 2", image: julia }
]

function Project({ lists }) {
return (
        <>
            { lists.map( list => (
            <div className={ `${styles.gridItem} filter-item ${list.filter}` } key={list.id}>
                <a className={styles.gridItemLink} target="_blank" rel="noopener noreferrer" href={list.url} aria-label={list.label}>
                <div className={styles.projectBox}>
                    <div className={styles.projectBoxImg}>
                    <Image
                        width={800}
                        height={389}
                        rel="noopener noreferrer"
                        src={list.image}
                        className=""
                        alt={list.label}
                    />
                    </div>

                    <ul className={styles.projectBoxContent}>
                    <li className={styles.contentItem + styles.projectBoxTax}>Platform:</li>
                    <li className={styles.contentItem + styles.projectBoxTax}>{list.platform}</li>
                    </ul>
                </div>
                </a>
            </div>
            ))}
        </>
    )
}

class Projects extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.onFilterChange = this.onFilterChange.bind(this);
  // }

  // Click Function
  // onFilterChange = (newFilter) => {
  //   if (this.iso === undefined) {
  //     this.iso = new Isotope('#filter-container', {
  //       itemSelector: '.filter-item',
  //       layoutMode: "fitRows"
  //     });
  //   }
  //   if(newFilter === '*') {
  //     this.iso.arrange({ filter: `*` });
  //   } else {
  //     this.iso.arrange({ filter: `.${newFilter}` });
  //   }
  // }

  render() {
    return(
      <section id="projects" className={styles.projects + " scrollto"}>
          <div className={styles.projectsTitleTitleWrap}>
            <h2 className={styles.projectsTitle}>Projects</h2>

            <h3 className={styles.projectsSubTitle}>List of Projects.</h3>
          </div>

          <div className={styles.filterBtn}>
            <button data-filter="*" onClick={() => {this.onFilterChange("*")}}>All</button>

            <button data-filter="filter-one" onClick={() => {this.onFilterChange("filter-one")}}>Magento</button>

            <button data-filter="filter-two" onClick={() => {this.onFilterChange("filter-two")}}>WordPress</button>

            <button data-filter="filter-three" onClick={() => {this.onFilterChange("filter-three")}}>Misc</button>
          </div>

          <div id="filter-container" className={styles.grid}>
            <Project lists={projectLists} />
          </div>
      </section>
    )
  }
}


export default Projects
