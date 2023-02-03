import { useCallback, useEffect } from 'react';

const ANT_DATE_PICKER_PANEL_CLASS = 'ant-picker-dropdown';

export const useDateRangeOutsideClick = (ref, onOutsideClick) => {
  const concernedElements = useCallback(() => {
    return [
      ref.current,
      ...document.getElementsByClassName(ANT_DATE_PICKER_PANEL_CLASS),
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
