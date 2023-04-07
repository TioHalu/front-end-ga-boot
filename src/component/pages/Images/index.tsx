
import Base from '../../layouts/base';
import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
export default function Deploy() {
   const dataTable = [
  {
    title: "Images Name",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh",]
  },
  {
    title: "Tag",
    value:["aduh","aduh"]
  },
   {
    title: "Repository",
    value:["test","tfsfd"]
  },
  {
    title: "Status",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh"]
  },
   {
    title: "Build At",
    value:["test","tfsfd"]
  },
]
  return (
    <Base>
     <div className={styles.wrapper}>
        <h1>Images Registry</h1>
      </div>
      <div className={styles.tableWrapper}>
        
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>

  )
}