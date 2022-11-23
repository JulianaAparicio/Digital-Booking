import Card from '../../../shared/Card/Card';
import CheckIcon from '../../../shared/Icons/CheckIcon';
import Input from '../../../shared/Input/Input';

const ReservationCheckIn = ({ reservationForm }) => {
   return (
      <section className="db-check-in">
         <h2>Tu horario de llegada</h2>
         <Card>
            <div className="top">
               <CheckIcon />
               <p>
                  Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM
               </p>
            </div>
            <div className="bottom">
               <p>Indica tu horario estimado de llegada</p>
               <Input
                  type="time-picker"
                  value={reservationForm.checkIn.state[0]}
                  setValue={reservationForm.checkIn.state[1]}
               />
            </div>
         </Card>
      </section>
   );
};

export default ReservationCheckIn;
