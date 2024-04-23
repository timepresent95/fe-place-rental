import { useEffect } from "react";

export function useClickOutside(
  onClickHandler: () => void,
  ignoreClassName: string
) {
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${ignoreClassName}`)) {
        onClickHandler();
      }
    }
    window.addEventListener("click", onClickOutside);

    return () => {
      window.removeEventListener("click", onClickOutside);
    };
  }, [ignoreClassName, onClickHandler]);
}
