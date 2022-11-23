import { useEffect } from 'react';
import Card from '../../../shared/Card/Card';
import Input from '../../../shared/Input/Input';
import { getValidationErrors } from '../../../utils/validationErrors';

const ReservationForm = ({ user, reservationForm, currentProduct }) => {
   useEffect(() => {
      reservationForm.userId.state[1](user.id);
   }, [user]);

   const vacineOptions = ['Si', 'No', 'Parcialmente'];

   return (
      <section className="db-form">
         <h2>Completa tus datos</h2>
         <Card>
            <Input
               value={user.name}
               id={'name'}
               placeholder={''}
               type={'text'}
               label={'Nombre'}
               errors={getValidationErrors('text', false)}
               setValue={reservationForm.name.state[1]}
               name={'name'}
               setInputValidation={reservationForm.name.isValid[1]}
               // isReadOnly={true}
               isDisabled={true}
            />
            <Input
               value={user.lastName}
               id={'lastName'}
               placeholder={''}
               type={'text'}
               label={'Apellido'}
               errors={getValidationErrors('text', false)}
               setValue={reservationForm.lastName.state[1]}
               name={'lastName'}
               setInputValidation={reservationForm.lastName.isValid[1]}
               // isReadOnly={true}
               isDisabled={true}
            />
            <Input
               value={user.sub}
               id={'email'}
               placeholder={''}
               type={'email'}
               label={'Correo Electronico'}
               errors={getValidationErrors('email', true)}
               setValue={reservationForm.email.state[1]}
               name={'email'}
               setInputValidation={reservationForm.email.isValid[1]}
               // isReadOnly={true}
               isDisabled={true}
            />
            <Input
               value={`${currentProduct.location.city.name}, ${currentProduct.location.city.state}`}
               id={'city'}
               placeholder={''}
               type={'text'}
               label={'Ciudad'}
               errors={getValidationErrors('text', true)}
               setValue={reservationForm.city.state[1]}
               name={'city'}
               setInputValidation={reservationForm.city.isValid[1]}
               // isReadOnly={true}
               isDisabled={true}
            />
            <Input
               type="select"
               value={reservationForm.vacined.state[0]}
               setValue={reservationForm.vacined.state[1]}
               label={'¿Estás vacunad@?'}
               options={vacineOptions}
            />
            <Input
               type="textarea"
               value={reservationForm.tips.state[0]}
               setValue={reservationForm.tips.state[1]}
               label={'¿Datos estra para el vendedor?'}
            />
         </Card>
      </section>
   );
};

export default ReservationForm;
