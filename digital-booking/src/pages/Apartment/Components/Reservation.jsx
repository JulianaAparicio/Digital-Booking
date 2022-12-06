import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import { Context } from '../../../core/Context';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Reservation({ id }) {
   const appContext = useContext(Context);

   return (
      <Card classList={'db-card-reservation'}>
         <div className="db-reservation">
            <div>Agregá fecha de tus viajes para obtener precios exactos</div>
            {/*si el usuario esta logeado */}
            {appContext.user ? (
               <Link to={`/booking/${id}`}>
                  <Button classList={'db-button-primary'}>Iniciar Reserva</Button>
               </Link>
            ) : (
               /*si el usuario no esta logeado + mensaje */
               <Link
                  to={'/Login'}
                  state={{
                     reservationMessage: 'Para realizar una reserva necesitas estar logueado',
                  }}>
                  <Button classList={'db-button-primary'}>Iniciar Reserva</Button>
               </Link>
            )}
         </div>
      </Card>
   );
}
