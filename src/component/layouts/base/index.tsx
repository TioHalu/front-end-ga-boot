import Button from "../../elements/Button";
import Search from "../../elements/Search";
import styles from "./styles.module.scss";
import Drawer from "./drawer"
export default function Base({children}:any) {
  return (
    <div className={styles.root}>
      <div className={styles.sideBar}>
        <div className={styles.title}>
          <h1>Gaboot 2.0</h1>
          <span>By IT Paragon X Adaptive Network X PIP 4.0</span>
          <hr />
          <Drawer/>
        </div>
        
      </div>
      <div className={styles.navbarWrapper}>
        <div className={styles.appBar}>
          <h1>Gaboot Deployment Platform</h1>
          <div className={styles.right}>
            <Search placeholder="Cari"/>
            <Button>Sync</Button>
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}