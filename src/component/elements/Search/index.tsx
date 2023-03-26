import styles from "./styles.module.scss";
import search from "../../../assets/icons/search.svg"
import Image from 'next/image'
function Component({placeholder}:any){
  return (
    <div className={styles.root}>
      <div className={styles.searchWrapper}>
        <button>
        <Image src={search} alt="search"/>
        </button>
        <input placeholder={placeholder} />
        </div>
    </div>
  )
}

export default Component;