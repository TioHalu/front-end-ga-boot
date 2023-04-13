import styles from "./styles.module.scss"
function Component({title, value, desc}:any) {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <label>{title}</label>
        <h1>{value}</h1>
        <div className={styles.desc}>
          {
            desc.map((item: any, index: number) => {
              return (
                <>
                  <div key={index} style={{ background: item.color }}></div>
                  <p>{item.name}:{item.value}</p>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Component