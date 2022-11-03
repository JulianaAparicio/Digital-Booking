import { useEffect, useId, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import './Input.scss';

export default function Input({
   type,
   label,
   name,
   id,
   icon,
   placeholder,
   isDisabled,
   setValue,
   errors,
   setInputValidation,
   minDate = null
}) {
   const [isFocus, setFocus] = useState(false);
   const [isInvalid, setInvalid] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const inputRef = useRef();

   const inputId = useId();

   const handleFocus = $event => {
      setFocus(true);
   };
   const handleBlur = $event => {
      setFocus(false);
   };

   const handleChangeInput = $event => {
      const error = errors
         .map(validationError => validationError($event.target.value, name))
         .reduce((messages, error) => `${error ? error + '.' : ''} ${messages} `, '');
      if (!Boolean(error.trim())) {
         setValue($event.target.value);
         setInvalid(false);
         setInputValidation(true);
      } else {
         setErrorMessage(error);
         setInvalid(true);
         setInputValidation(false);
      }
   };

   useEffect(() => {
      const input = inputRef && inputRef.current && inputRef.current.firstChild;
      if (input) {
         input.addEventListener('focus', handleFocus);
         input.addEventListener('blur', handleBlur);
      }

      return () => {
         if (input) {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
         }
      };
   }, []);

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
                  plugins={[<DatePanel />]}
                  minDate={minDate}
                  range
               />
            ) : (
               <input
                  key={id}
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
               />
            )}
         </div>
         {errorMessage && isInvalid ? <div className="db-input-error">{errorMessage}</div> : null}
      </div>
   );
}
