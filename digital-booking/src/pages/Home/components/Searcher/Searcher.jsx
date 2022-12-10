import { useEffect } from 'react';
import Button from '../../../../shared/Button/Button';
import CalendarIcon from '../../../../shared/Icons/CalendarIcon';
import LocationIcon from '../../../../shared/Icons/locationIcon';
import Input from '../../../../shared/Input/Input';
import Typehead from '../../../../shared/Input/Typehead';
import Spinner from '../../../../shared/Spinner/Spinner';
import titleCase from '../../../../utils/titleCase';
import { getValidationErrors } from '../../../../utils/validationErrors';

const Searcher = ({
   setDate,
   setPlace,
   setPlaceValidation,
   setDateValidation,
   typeHeadOptions,
   search,
   isLoading,
   date,
}) => {
   const typeHeadOptionsMapper = () => {
      return typeHeadOptions.map(option => {
         return {
            id: option.id,
            title: `${titleCase(option.name)} - ${titleCase(option.state)}`,
            subtitle: option.country,
            icon: <LocationIcon />,
         };
      });
   };

   return (
      <section className="searcher">
         <h1>Busca ofertas en hoteles, casas y mucho más</h1>
         <div className="inputs">
            <Typehead
               type={'text'}
               placeholder={'¿A donde vamos?'}
               icon={<LocationIcon />}
               isDisabled={false}
               errors={getValidationErrors('typehead', true)}
               setValue={setPlace}
               items={typeHeadOptionsMapper()}
               maxItemsLength={4}
               name={'Destino'}
               setInputValidation={setPlaceValidation}
            />
            <Input
               icon={<CalendarIcon />}
               placeholder={'Fecha de inicio - Fecha de salida'}
               type="date-picker"
               errors={getValidationErrors('datepicker', true)}
               setValue={setDate}
               minDate={new Date()}
               setInputValidation={setDateValidation}
               clear
            />
            <Button
               isDisabled={date?.length === 1}
               classList={'searchButton db-button-primary'}
               action={search}>
               {isLoading ? <Spinner /> : null}
               Buscar
            </Button>
         </div>
      </section>
   );
};

export default Searcher;
