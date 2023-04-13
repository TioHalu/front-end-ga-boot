import { Modal, Text } from "@nextui-org/react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  title?: string;
  component?: any;
};


export default function component({ open, title, component }: Props) {
  
  return (
    <Modal open={open} className={styles.root}>
      <Modal.Header>
        <Text h3>{title} </Text>
      </Modal.Header>
      <Modal.Body>
        {component}
      </Modal.Body>
    </Modal>
  );
}