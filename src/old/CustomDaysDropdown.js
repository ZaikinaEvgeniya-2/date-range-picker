import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown, Menu, Typography } from 'antd';
import styled from 'styled-components';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import { capitalize, isArray, toString } from 'lodash';
import moment from 'moment';
import {
  MAX_ANALYTICS_HOURS,
  CUSTOM_FILTER_OPTIONS,
  NONE,
  CUSTOM,
} from './constants';
import CustomRangePicker from './CustomRangePicker';
const { Text } = Typography;

const CUSTOM_OPTION = Object.freeze({
  key: 'CUSTOM',
  value: null,
  displayText: 'Custom',
});

const getRangeDefaultValue = (value, options) => {
  const option = options.find((item) => item.value === value);
  if (!option) {
    return { ...CUSTOM_OPTION, value: value };
  }

  return option;
};

function Component({
  className,
  options = CUSTOM_FILTER_OPTIONS,
  onChange = undefined,
  enableCustomDate = true,
  enableEmptySelection = true,

  defaultValue = {
    key: NONE,
    value: undefined,
    displayText: capitalize(NONE),
  },

  value = undefined,
}) {
  const defValue =
    value !== undefined ? getRangeDefaultValue(value, options) : defaultValue;

  const [selectedValue, setSelectedValue] = useState(defValue.key);
  const [selectedDisplayValue, setSelectedDisplayValue] = useState(
    defValue.displayText
  );
  const [openCalender, setOpenCalender] = useState(false);

  // useEffect(() => {
  //   setSelectedDisplayValue(defValue.displayText);
  //   if (defValue.key === CUSTOM) {
  //     setOpenCalender(CALENDER_STATES.NOT_DEFINED);
  //     setSelectedValue(defValue.key);
  //     setSelectedDisplayValue("");
  //     return;
  //   }
  // }, [defValue]);

  const onOpenChange = useCallback((open) => {
    setOpenCalender(open);
  }, []);

  const onMenuItemClick = useCallback(
    (val, displayText) => {
      if (val === CUSTOM) {
        setOpenCalender(false);
        setSelectedValue(val);
        setSelectedDisplayValue('');
        return;
      }

      if (val === NONE) {
        setSelectedValue(undefined);
        setSelectedDisplayValue(capitalize(NONE));
        setOpenCalender(false);
        if (onChange) onChange(undefined);
        return;
      }

      setOpenCalender(false);
      setSelectedValue(val);
      setSelectedDisplayValue(displayText);
      if (onChange) onChange(val);
    },
    [onChange]
  );

  const menuItems = useMemo(() => {
    let items = options.map(({ key, value, displayText }) => {
      return {
        key,
        label: (
          <div key={key} onClick={() => onMenuItemClick(value, displayText)}>
            <Text>{displayText}</Text>
          </div>
        ),
      };
    });

    if (enableCustomDate) {
      items = [
        ...items,
        {
          key: CUSTOM,
          label: (
            <div key={CUSTOM} onClick={() => onMenuItemClick(CUSTOM, CUSTOM)}>
              <Text>Custom</Text>
            </div>
          ),
        },
      ];
    }
    if (enableEmptySelection) {
      items = [
        ...items,
        {
          key: NONE,
          label: (
            <div key={NONE} onClick={() => onMenuItemClick(NONE, NONE)}>
              <Text> {capitalize(NONE)}</Text>
            </div>
          ),
        },
      ];
    }

    return <Menu items={items} />;
  }, [options, onMenuItemClick, enableCustomDate, enableEmptySelection]);

  const onCloseClick = useCallback(() => {
    setOpenCalender(false);
    if (enableEmptySelection) {
      setSelectedValue(undefined);
      setSelectedDisplayValue(capitalize(NONE));
      if (onChange) onChange(undefined);
      return;
    }
    setSelectedValue(defaultValue.value);
    setSelectedDisplayValue(defaultValue.displayText);
    if (onChange) onChange(defaultValue.value);
  }, [onChange, enableEmptySelection, defaultValue]);

  const onRangeChange = (val) => {
    if (!val) {
      if (onChange) onChange(undefined);
      return;
    }

    if (!isArray(val) || val.length !== 2 || !val[0] || !val[1]) return;

    const startDateEpoch = toString(moment(val[0]).unix());
    const endDateEpoch = toString(moment(val[1]).unix());
    if (onChange) onChange([startDateEpoch, endDateEpoch]);
  };
  return (
    <div className={className}>
      <div className="dropdownContainer">
        <Dropdown
          overlay={menuItems}
          trigger={['click']}
          open={selectedValue === CUSTOM ? false : openCalender}
          onOpenChange={onOpenChange}
        >
          <div className="selectHeader">
            {enableCustomDate && selectedValue === CUSTOM ? (
              <div className="rangeContainer">
                <CustomRangePicker
                  bordered={false}
                  // open={openCalender === CALENDER_STATES.NOT_DEFINED}
                  onCalendarChange={(val) => onRangeChange(val)}
                  className=""
                  maxHours={MAX_ANALYTICS_HOURS}
                  allowClear
                  showTime
                  defaultValue={defValue.key === CUSTOM ? defValue.value : null}
                />
                <CloseOutlined onClick={onCloseClick} className="closeIcon" />
              </div>
            ) : null}
            {selectedValue !== CUSTOM ? (
              <>
                <Text>{selectedDisplayValue}</Text>
                <DownOutlined size={14} />
              </>
            ) : null}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

const CustomDaysDropdown = styled(Component)`
  .dropdownContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .selectHeader {
    display: inline-flex;
    padding-left: 12px;
    padding-right: 12px;
    gap: 26px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(2, 9, 28, 0.28);
    border-radius: 4px;
    min-width: 150px;
    min-height: 40px;
  }

  .dateRangePicker {
    height: 0px;
    width: 0px;
    .ant-picker-input {
      display: none;
    }
    .ant-picker-range-separator {
      display: none;
    }
    .ant-picker-active-bar {
      display: none;
    }
    .ant-picker-suffix {
      display: none;
    }
  }
  .rangeContainer {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .closeIcon {
    color: rgba(0, 0, 0, 0.25);
  }
`;

export default CustomDaysDropdown;
