import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import LocationIcon from '../../../shared/Icons/LocationIcon';

const ApartmentOverview = ({
   currentProduct,
   getCheckInDate,
   getCheckOutDate,
   confirm,
   isLoading,
   isDisabled,
}) => {
   return (
      <section className="db-apartment-overview">
         <Card>
            <h2>Detalle de la reserva</h2>
            <div className="top">
               <img src={currentProduct.images.at(0)?.url ?? ''} alt="" />
            </div>
            <div>
               <div className="details">
                  <p>{currentProduct.category.title}</p>
                  <h3>{currentProduct.title}</h3>
                  <div className="description">
                     <LocationIcon />
                     <p>
                        {(l => [l.address, l.city.name, l.city.state, l.city.country].join(', '))(
                           currentProduct.location
                        )}
                     </p>
                  </div>
               </div>
               <div className="bottom">
                  <hr />
                  <div className="check-in">
                     <p className="label">Check in</p>
                     <p>{getCheckInDate() ?? 'Aun no seleccionado'}</p>
                  </div>
                  <hr />
                  <div className="check-out">
                     <p className="label">Check out</p>
                     <p>{getCheckOutDate() ?? 'Aun no seleccionado'}</p>
                  </div>
                  <hr />

                  <Button classList="db-button-primary" isDisabled={isDisabled} action={confirm}>
                     {/* {isLoading ? <Spinner /> : null} */}
                     Confirmar reserva
                  </Button>
               </div>
            </div>
         </Card>
      </section>
   );
};

export default ApartmentOverview;
