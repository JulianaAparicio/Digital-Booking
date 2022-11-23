import MainCenterLayout from '../../shared/Layouts/MainCenterLayout/MainCenterLayout';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Spinner from '../../shared/Spinner/Spinner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getValidationErrors } from '../../utils/validationErrors';
import { formStateValidation } from '../../utils/formStateMapper';
import { useContext, useState, useEffect } from 'react';
import Alert from '../../shared/Alert/Alert';
import { Context } from '../../core/Context';
import { loginUser } from '../../core/services/Auth';
import { decodeToken, setToken } from '../../core/services/Token';

const Login = () => {
   let browserNavigate = useNavigate();
   const appContext = useContext(Context);



   const location = useLocation();

   const [message, setMessage] = useState("");
   const { reservationMessage } = location.state ? location.state : false;

   const [isLoading, setIsLoading] = useState(false);
   const [failedAuth, setFailedAuth] = useState(false);

   const loginForm = {
      email: { state: useState(), isValid: useState(false) },
      password: { state: useState(), isValid: useState(false) },
   };

   useEffect(() => {
      if (appContext.user) {
         browserNavigate("/");
      }
      if (reservationMessage) {
         setMessage(reservationMessage);
      }
   }, [browserNavigate]);

   const login = () => {
      setIsLoading(true);
      loginUser(loginForm).then(data => {
         setToken(data);
         appContext.setUser(decodeToken());
         browserNavigate('/');
      }).catch((e) => setFailedAuth(true)).finally(() => setIsLoading(false));
   };

   const closeAlert = () => {
      setFailedAuth(false)
   }

   const closeAlertReservation =() =>{
      setMessage(!message)
   }
   return (
      <>
         {message && (
            <div className='db-alert' style={{zIndex:"1"}}>
               <Alert type={'error'} close={closeAlertReservation} >{message}</Alert>
               </div>
            )}
         <MainCenterLayout>
            
            <div className="db-login">
               <h1 className="db-form-title">Iniciar sesión</h1>
               <Input
                  id={'email'}
                  placeholder={''}
                  type={'email'}
                  label={'Correo Electronico'}
                  errors={getValidationErrors('email', true)}
                  setValue={loginForm.email.state[1]}
                  name={'email'}
                  setInputValidation={loginForm.email.isValid[1]}
               />
               <Input
                  id={'password'}
                  placeholder={''}
                  type={'password'}
                  label={'Contraseña'}
                  errors={getValidationErrors('password', true)}
                  setValue={loginForm.password.state[1]}
                  name={'password'}
                  setInputValidation={loginForm.password.isValid[1]}
               />
               <Button
                  classList={'db-button-primary db-button-small'}
                  action={login}
                  isDisabled={!formStateValidation(loginForm)}>
                  {isLoading ? <Spinner /> : null}
                  Iniciar sesión
               </Button>
               <div className="db-form-footer">
                  <span>¿No tienes una cuenta? </span>
                  <Link to={'/register'}>
                     <span>Registrarse</span>
                  </Link>
               </div>
            </div>
         </MainCenterLayout>
         {failedAuth ?
            <Alert type={'error'} close={closeAlert}>
               Usuario o contraseña incorrectos.<br />¡Intente de nuevo!
            </Alert> : null
         }
      </>
   );
};

export default Login;
