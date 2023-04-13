
import Base from '../../layouts/base';

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
import Modal from "@/component/elements/Modal";
import Input from "@/component/elements/Input";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
export default function Deploy() {
  const [open, setOpen] = useState<boolean>(false);
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
  const _handleChange = (e: any) => { }
  const renderComponentModal = (
    <div className={styles.modalWrapper}>
      <Input variant="form" label="Nama" onChange={_handleChange} icon={<PersonIcon/>} />
    </div>
  )
  return (
    <Base>
     <div className={styles.wrapper}>
        <h1>Member</h1>
        <Button onClick={()=>setOpen(!open)}>+ tambahkan User</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Modal open={open} component={renderComponentModal} />
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>

  )
}