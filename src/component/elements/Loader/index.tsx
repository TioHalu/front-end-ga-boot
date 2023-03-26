import { Loading } from '@nextui-org/react';
import { classicNameResolver } from 'typescript';
import styles from "./styles.module.scss";


function Loader() {
  return (
    <div className={styles.root}>
      <Loading type="points"/>
    </div>
  );
}

export default Loader;