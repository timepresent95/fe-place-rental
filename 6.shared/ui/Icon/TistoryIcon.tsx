import { FC, HTMLAttributes } from "react";

const TistoryIcon: FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
  return (
    <div {...props}>
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Tistory</title>
        <path d="M0 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0m9 18a3 3 0 1 0 6 0 3 3 0 0 0-6 0m0-9a3 3 0 1 0 6 0 3 3 0 0 0-6 0m0-9a3 3 0 1 0 6 0 3 3 0 0 0-6 0m9 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
      </svg>
    </div>
  );
};
export default TistoryIcon;
