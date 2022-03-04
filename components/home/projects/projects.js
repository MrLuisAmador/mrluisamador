import { useState } from "react";
import AllProjectsItem from "./projects-item";
import PROJECT_LIST from "./projects-list"; // data
import styles from "./projects.module.scss";

function Projects() {
  const [state, setState] = useState(PROJECT_LIST);

  const handleBtn = (e) =>  {
    let word = e.target.value;

    if (word === 'All') {
      setState(PROJECT_LIST);
    } 
    
    else if (word === 'Magento') {
        const filtered = PROJECT_LIST.filter(item=>item.filter === 'Magento');
        setState(filtered);
    }

    else if (word === 'WordPress') {
      const filtered = PROJECT_LIST.filter(item=>item.filter === 'WordPress');
      setState(filtered);
    }

    else if (word === 'Misc') {
      const filtered = PROJECT_LIST.filter(item=>item.filter === 'Misc');
      setState(filtered);
    }

  }

    return(
      <section id="projects" className={styles.projects + " scrollto"}>
          <div className={styles.projectsTitleTitleWrap}>
            <h2 className={styles.projectsTitle}>Projects</h2>

            <h3 className={styles.projectsSubTitle}>List of Projects.</h3>
          </div>

          <div className={styles.filterBtn}>
            <button value="All" onClick={handleBtn}>All</button>

            <button value="Magento" onClick={handleBtn}>Magento</button>

            <button value="WordPress" onClick={handleBtn}>WordPress</button>

            <button value="Misc" onClick={handleBtn}>Misc</button>
          </div>

          <div id="filter-container" className={styles.grid}>
            <AllProjectsItem lists={state} />
          </div>
      </section>
    )
}


export default Projects;
