
import Base from '../../layouts/base';

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
export default function Deploy() {
   const dataTable = [
  {
    title: "Developer Name",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh",]
  },
  {
    title: "username",
    value:["aduh","aduh"]
  },
   {
    title: "Email",
    value:["test","tfsfd"]
  },
  {
    title: "Namespaces",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh"]
  },
   {
    title: "Role",
    value:["test","tfsfd"]
  },
  {
    title: "Created At",
    value:["aduh","aduh"]
    },
   {
    title: "Update At",
    value:["aduh","aduh"]
     },
   {
    title: "username",
    value:["aduh","aduh"]
     },
   
]
  return (
    <Base>
     <div className={styles.wrapper}>
        <h1>Member</h1>
        <Button>+ tambahkan User</Button>
      </div>
      <div className={styles.tableWrapper}>
        
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>

  )
}