
import Base from '../../layouts/base';

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
export default function Deploy() {
   const dataTable = [
  {
    title: "Addons Name",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh",]
  },
  {
    title: "Images",
    value:["aduh","aduh"]
  },
   {
    title: "Environment Variable",
    value:["test","tfsfd"]
  },
  {
    title: "Namespaces",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh"]
  },
   {
    title: "Developer Name",
    value:["test","tfsfd"]
  },
  {
    title: "Created At",
    value:["aduh","aduh"]
    },
   {
    title: "Aksi",
    value:["aduh","aduh"]
  }
]
  return (
    <Base>
     <div className={styles.wrapper}>
        <h1>Addons</h1>
      </div>
      <div className={styles.tableWrapper}>
        
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>

  )
}