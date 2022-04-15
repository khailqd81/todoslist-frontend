import { forwardRef, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function MyDatePicker({ deadline, onDeadlineChange }) {
  // const [startDate, setStartDate] = useState(new Date(deadline));
  let startDate = new Date(deadline);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="rounded bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-2 py-1 mr-4" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={deadline}
      minDate={new Date()}
      onChange={(date) => onDeadlineChange(date)}
      customInput={<ExampleCustomInput />}
    />
  );
}

export default MyDatePicker;
