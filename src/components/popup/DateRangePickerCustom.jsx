import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DateRangePickerCustom = ({ handleApply, handleCancel }) => {
  const [value, setValue] = useState(null);

  const onChange = (selectedValue) => {
    setValue(selectedValue);

    if (selectedValue?.length === 2) {
      handleApply?.(selectedValue);
      return;
    }

    handleCancel?.();
  };

  const onClean = () => {
    setValue(null);
    handleCancel?.();
  };

  return (
    <div className="ds-filter-input-wrp">
      <div className="input-grp datefield-wrp">
        <DateRangePicker
          value={value}
          onChange={onChange}
          onClean={onClean}
          editable={false}
          cleanable
          placement="bottomEnd"
          placeholder="Date range"
          className="inputField shortInputField dateRangeField"
        />
      </div>
    </div>
  );
};

export default DateRangePickerCustom;
