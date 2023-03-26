import styles from "./styles.module.scss";

function Component({ onClick, children }:any) {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

export default Component;