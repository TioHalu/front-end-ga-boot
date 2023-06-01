
import Base from '../../layouts/base';

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
import { lazy, Suspense, useState } from "react";
import { Modal } from "@nextui-org/react";
const Terminal = lazy(() => import("@/component/elements/Terminal"));
export default function Deploy() {
const [open, setOpen] = useState(false);
  return (
    <Base>
     <div className={styles.wrapper}>
        <h1>Deployment</h1>
        <Button onClick={() => setOpen(!open)} 
        >+ Deploy</Button>
      </div>
      <div className={styles.tableWrapper}>
        
        {/* <Table data={dataTable} pageSize={10}/> */}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        >
        <Modal.Header>Deploy</Modal.Header>
        <Modal.Body>
          <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Terminal socketUrl="wss://api-gaboot.adaptivenetlab.site/v1/exec/gaboot/be-single-service-bdbb844cb-ljsbl" />
          </Suspense>
          </div>
          </Modal.Body>
      </Modal>
        
    </Base>

  )
}