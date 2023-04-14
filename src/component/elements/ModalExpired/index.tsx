import { Modal, Text } from "@nextui-org/react";
import Button from "@/component/elements/Button";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
export default function ModalExpired(props: any) {
  const { open } = props;
  const router = useRouter();
  const _handleOk = () => {
    router.push("/");
  };
  return (
    <Modal open={open}>
      <Modal.Header>
        <Text h3>Session Expired </Text>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <Button onClick={_handleOk}>Ok</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}