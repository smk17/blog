import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const AntLayout = ({ children }: Props) => <div className={styles.antd}>{children}</div>;
