import { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared/Button/Button';
import Card from '../../../shared/Card/Card';
import CheckStarIcon from '../../../shared/Icons/CheckStarIcon';

const Thanks = forwardRef(({ redirection, children }, ref) => {
   const hidde = () => {
      ref.current.style.display = 'none';
      window.scrollTo(0, 0);
      navigate(redirection);
   };

   const navigate = useNavigate();

   return (
      <div ref={ref} className="db-thanks-container">
         <Card>
            <CheckStarIcon />
            <h3>¡Muchas gracias!</h3>
            <p>{children}</p>
            <Button action={hidde} classList="db-button-primary">
               Ok
            </Button>
         </Card>
      </div>
   );
});

export default Thanks;
