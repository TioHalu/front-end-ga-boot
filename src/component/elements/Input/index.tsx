import React from "react";
import styles from "./index.module.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import clsx from "clsx";

function Input({ placeholder, onChange, label, variant, icon }: any) {
  const [eye, setEye] = React.useState(false);
  const _handleMouseDown = () => {
    console.log(eye);
    setEye(!eye);
  };
  const Variant = (variant:string) => {
    switch (variant) {
      case 'biasa':
        return (
          <div className={styles.inputWrapper}>
            <input placeholder={placeholder} onChange={onChange}/>
          </div>
        )
      case 'kata-sandi':
          return (
          <div className={clsx(styles.inputWrapper, variant==='kata-sandi' && styles.sandi)}>
              <input placeholder={placeholder} onChange={onChange}  type={eye ? 'text' : 'password'}/>
              <button
              onClick={_handleMouseDown}
              type="button"
            >
              {eye ? (
                <VisibilityIcon fontSize="inherit" />
              ) : (
                  <VisibilityOffIcon fontSize="inherit" />
              )}
            </button>
          </div>
        )
      case 'form':
        return (
          <div className={styles.formWrapper}>
            {icon}
            <input placeholder={placeholder} onChange={onChange} />
          </div>
        )
      default:
        break;
    }
  }
  return (
    <div className={styles.root}>
      <label className={styles.inputLabel}>{label}</label>
        {Variant(variant)}
    </div>
  );
}

export default Input;