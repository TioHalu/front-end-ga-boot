import styles from "./styles.module.scss";
import clsx from "clsx";
function Component({ onClick, children, variant, className }:any) {
  return (
    <div className={clsx(styles.buttonWrapper, {
      [styles.small]: variant === "small",
      [styles.rounded]: variant === "rounded",
    },className)}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

export default Component;