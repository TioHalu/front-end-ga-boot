import { Loading } from '@nextui-org/react';
import styles from "./styles.module.scss";
import PropTypes from 'prop-types';
function Loader({type, size}:any) {
  return (
    <div className={styles.root}>
      <Loading type={type} size={size} />
    </div>
  );
}

export default Loader;

Loader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
};

Loader.defaultProps = {
  type: 'points',
  size: 'large',
};