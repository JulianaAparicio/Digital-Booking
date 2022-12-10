import { useEffect, useId, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { months, weekDays } from '../../utils/spanishCalendar';
import TimePicker from 'react-multi-date-picker/plugins/analog_time_picker';
import './Input.scss';

export default function Input({
   type,
   label,
   name,
   id,
   icon,
   placeholder,
   isDisabled,
   isReadOnly,
   setValue,
   errors,
   setInputValidation,
   minDate = null,
   value,
   options = [],
   values = false,
   clear = false,
}) {
   const [isFocus, setFocus] = useState(false);
   const [isInvalid, setInvalid] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [isMobile, setIsMobile] = useState(null);

   if (!values) values = options;

   const inputRef = useRef();

   const handleFocus = $event => {
      setFocus(true);
   };
   const handleBlur = $event => {
      setFocus(false);
   };

   const handleChangeInput = $event => {
      const error = errors
         ? errors
              .map(validationError => validationError($event.target.value, name))
              .reduce((messages, error) => `${error ? error + '.' : ''} ${messages} `, '')
         : '';
      if (!Boolean(error.trim())) {
         setValue($event.target.value);
         setInvalid(false);
         setInputValidation && setInputValidation(true);
      } else {
         setErrorMessage(error);
         setInvalid(true);
         setInputValidation && setInputValidation(false);
      }
   };

   useEffect(() => {
      const input = inputRef && inputRef.current && inputRef.current.firstChild;
      if (input) {
         input.addEventListener('focus', handleFocus);
         input.addEventListener('blur', handleBlur);
      }

      const changeCalendar = () => {
         setIsMobile(window.matchMedia('(width < 600px)').matches ? true : false);
      };

      changeCalendar();

      window.addEventListener('resize', changeCalendar);

      return () => {
         if (input) {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
         }

         window.removeEventListener('resize', changeCalendar);
      };
   }, []);

   const datePickerPlugins = clear ? [<DatePanel />] : [];

   return (
      <div className="db-input">
         {label ? (
            <label className="db-input-label" htmlFor={id}>
               {label}
            </label>
         ) : null}
         <div
            className={`db-input-wrapper ${isFocus ? 'focus' : ''} ${isInvalid ? 'invalid' : ''} ${
               isDisabled ? 'disabled' : ''
            }`}>
            {icon ? <span className="db-input-icon">{icon}</span> : null}
            {type === 'date-picker' ? (
               <DatePicker
                  onChange={setValue}
                  ref={inputRef}
                  placeholder={placeholder}
                  plugins={datePickerPlugins}
                  format="YYYY-MM-DD"
                  minDate={minDate}
                  numberOfMonths={isMobile ? 1 : 2}
                  range
                  weekDays={weekDays}
                  months={months}
               />
            ) : type === 'time-picker' ? (
               <DatePicker
                  onChange={setValue}
                  ref={inputRef}
                  value={value}
                  plugins={[<TimePicker hideSeconds />]}
                  format="HH:mm"
                  disableDayPicker
               />
            ) : type === 'select' ? (
               <select
                  key={id}
                  id={id}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}>
                  {options.map((op, i) => (
                     <option value={values[i]} key={i}>
                        {op}
                     </option>
                  ))}
               </select>
            ) : type === 'textarea' ? (
               <textarea
                  key={id}
                  id={id}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  value={value}></textarea>
            ) : (
               <input
                  key={id}
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  value={value}
               />
            )}
         </div>
         {errorMessage && isInvalid ? <div className="db-input-error">{errorMessage}</div> : null}
      </div>
   );
}
