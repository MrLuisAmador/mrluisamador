import Image from 'next/image';
import styles from "./projects.module.scss";


function AllProjectsItem({lists}) {
    
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

export default AllProjectsItem;