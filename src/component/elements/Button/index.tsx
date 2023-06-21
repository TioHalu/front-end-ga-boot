import styles from "./styles.module.scss";
import clsx from "clsx";
import Loader from "../Loader";
function Component({ onClick, children, variant, className,type, loading }:any) {
  return (
    <div className={clsx(styles.buttonWrapper, {
      [styles.small]: variant === "small",
      [styles.rounded]: variant === "rounded",
    },className)}>
      <button type={type} onClick={onClick}>{loading?(<Loader type="spinner" size="sm"/>):children}</button>
    </div>
  );
}

export default Component;