import { forwardRef } from 'react';
import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import CheckStarIcon from '../../../shared/Icons/CheckStarIcon';

const Thanks = forwardRef((props, ref) => {
   const hidde = () => {
      ref.current.style.display = 'none';
   };

   return (
      <div ref={ref} className="db-thanks-container">
         <Card>
            <CheckStarIcon />
            <h3>¡Muchas gracias!</h3>
            <p>Su reserva se ha realizado con éxito</p>
            <Button action={hidde} classList="db-button-primary">Ok</Button>
         </Card>
      </div>
   );
});

export default Thanks;
