import classNames from "classnames";
import styles from "./index.module.scss";

export const Markdown: React.FC<{ className?: string; children: string }> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames(className, styles.markdown)}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
};
