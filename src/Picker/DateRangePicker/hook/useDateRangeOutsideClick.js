import { useCallback, useEffect } from 'react';

const antDatePickerPanelClass = 'ant-picker-dropdown';

export const useDateRangeOutsideClick = (ref, onOutsideClick) => {
  const concernedElements = useCallback(() => {
    return [
      ref.current,
      ...document.getElementsByClassName(antDatePickerPanelClass),
    ];
  }, [ref]);

  const handleClickOutside = useCallback(
    (event) => {
      let isConcernedElementClick = false;

      for (let i = 0; i < concernedElements()?.length; i++) {
        if (concernedElements()[i]?.contains(event.target)) {
          isConcernedElementClick = true;
          continue;
        }
      }

      if (!isConcernedElementClick) {
        onOutsideClick && onOutsideClick();
      }
    },
    [concernedElements, onOutsideClick]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
