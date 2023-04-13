
import Base from '../../layouts/base';

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
export default function Deploy() {
   const dataTable = [
  {
    title: "Service Name",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh",]
  },
  {
    title: "Images",
    value:["aduh","aduh"]
  },
   {
    title: "Namespaces",
    value:["test","tfsfd"]
  },
  {
    title: "Deploy At",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh"]
  },
   {
    title: "Restart",
    value:["test","tfsfd"]
  },
  {
    title: "Status",
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
        <h1>Deployment</h1>
        <Button>+ Deploy</Button>
      </div>
      <div className={styles.tableWrapper}>
        
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>

  )
}