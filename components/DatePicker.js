import React from 'react'
import Flatpickr from "react-flatpickr";

const DatePicker = ({ startDate, endDate,minDate,onChange, maxDate }) => {
    return (
        <Flatpickr
        
            className="form-control col"
            value={startDate !== undefined ? startDate : endDate}
            onChange={date => (onChange(date))
            }
            options={{
                altInput: true,
                altFormat: "F j, Y",
                minDate:minDate,
                maxDate: maxDate && maxDate
            }}
        />
    )
}
export default DatePicker;