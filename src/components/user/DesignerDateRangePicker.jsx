import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DesignerDateRangePicker = ({ onApply, onCancel, placeholder }) => {
  const [value, setValue] = useState(null);

  const handleChange = (selectedValue) => {
    setValue(selectedValue);

    if (selectedValue?.length === 2) {
      onApply?.(selectedValue);
      return;
    }

    onCancel?.();
  };

  const handleClean = () => {
    setValue(null);
    onCancel?.();
  };

  return (
    <label className="daterange-btn">
      <img src="/images/filter-icons/date.svg" alt="" />
      <DateRangePicker
        value={value}
        onChange={handleChange}
        onClean={handleClean}
        editable={false}
        cleanable
        placement="bottomEnd"
        placeholder={placeholder || "Sign Up Date Range"}
        className="input"
      />
    </label>
  );
};

export default DesignerDateRangePicker;
