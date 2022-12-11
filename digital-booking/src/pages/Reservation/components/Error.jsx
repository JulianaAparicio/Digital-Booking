import { forwardRef } from 'react';
import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import SomethingWrongIcon from '../../../shared/Icons/SomethingWrongIcon';

const Error = forwardRef(({ action }, ref) => {
   const hide = () => {
      ref.current.style.display = 'none';
      action();
   };

   return (
      <div ref={ref} className="db-error-container">
         <Card>
            <SomethingWrongIcon />
            <h3>¡Ups! Algo salió mal</h3>
            <p>
               Revisa tus datos y prueba nuevamente. Si todos los campos están perfectos y sigue
               apareciendo esta alerta espera un tiempo y vuelve a intentar.
            </p>
            <Button action={hide} classList="db-button-primary">
               Ok
            </Button>
         </Card>
      </div>
   );
});

export default Error;
