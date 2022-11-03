import { useRef, useState, useEffect } from 'react';
import PanelOptions from '../PanelOptions/PanelOptions';
import './Input.scss';

export default function Typehead({
   type,
   label,
   name,
   id,
   icon,
   placeholder,
   isDisabled,
   setValue,
   errors,
   items,
   maxItemsLength,
   setInputValidation
}) {
   const typeheadRef = useRef();
   const [isFocus, setFocus] = useState(false);
   const [isInvalid, setInvalid] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [itemsFiltered, setItemsFiltered] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [searching, setSearching] = useState(false);

   useEffect(() => {
      const clickOutside = e => {
         if (searching && typeheadRef.current && !typeheadRef.current.contains(e.target)) {
            setSearching(false);
            handleChange('');
         }
      };

      document.addEventListener('mousedown', clickOutside);
      return () => {
         document.removeEventListener('mousedown', clickOutside);
      };
   }, [searching]);

   const handleClick = $event => {
      $event.target.select();
   };

   const handleFocus = $event => {
      setFocus(true);
   };
   const handleBlur = $event => {
      setFocus(false);
   };

   const handleChange = option => {
      const error = 
       errors
      .map(validationError => validationError(option.id, name))
      .reduce((messages, error) => `${error ? error + '.': ''} ${messages} `, '')
      if (items.some(item => item.id === option.id) && !Boolean(error.trim())) {
         setValue(option.id);
         setInputValue(option.title);
         setInvalid(false);
         setInputValidation(true)
      } else {
         setErrorMessage(error);
         setInvalid(true);
         setInputValidation(false)
      }
      setSearching(false);
   };

   const handleInputChange = $event => {
      setInputValue($event.target.value);

      if ($event.target.value.length >= 3) {
         setSearching(true);
         const filter = items.filter(item =>
            item.title.toLowerCase().includes($event.target.value.toLowerCase())
         );
         setItemsFiltered(
            filter.length
               ? filter.slice(0, maxItemsLength)
               : [{ id: 'NF', title: 'No se encontraron resultados' }]
         );
      } else {
         setSearching(false);
         setItemsFiltered([]);
      }
   };

   return (
      <div className="db-input" ref={typeheadRef}>
         {label ? (
            <label className="db-input-label" htmlFor={id}>
               {label}
            </label>
         ) : null}
         <div
            className={`db-input-wrapper ${isFocus ? 'focus' : ''} ${isInvalid ? 'invalid' : ''} ${
               isDisabled ? 'disabled' : ''
            }`}>
            <span className="db-input-icon">{icon}</span>
            <input
               key={id}
               id={id}
               type={type}
               placeholder={placeholder}
               disabled={isDisabled}
               value={inputValue}
               onFocus={handleFocus}
               onBlur={handleBlur}
               onClick={handleClick}
               onChange={handleInputChange}
            />
         </div>
         {searching ? (
            <div className="panelContainer">
               <PanelOptions items={itemsFiltered} selectOption={handleChange} />
            </div>
         ) : null}
         {errorMessage && isInvalid ? <div className="db-input-error">{errorMessage}</div> : null}
      </div>
   );
}
