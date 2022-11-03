import MainCenterLayout from '../../shared/Layouts/MainCenterLayout/MainCenterLayout';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Spinner from '../../shared/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getValidationErrors} from '../../utils/validationErrors';
import { loginUser } from '../../core/services/login';
import { formStateValidation } from '../../utils/formStateMapper';
import { useContext, useState } from 'react';
import Alert from '../../shared/Alert/Alert';
import { Context } from '../../core/Context';

const Login = () => {
   let browserNavigate = useNavigate();
   const userContext = useContext(Context);

   const [isLoading, setIsLoading] = useState(false);
   const [failedAuth, setFailedAuth] = useState(false);

   const loginForm = {
      email: { state: useState(), isValid: useState(false) },
      password: { state: useState(), isValid: useState(false) },
   };

   const login = () => {
      setIsLoading(true);
      loginUser(loginForm).then(userAuth => {
         setTimeout(() => {
            if (userAuth) {
               sessionStorage.setItem('CURRENT_USER', JSON.stringify(userAuth));
               userContext.setUser(userAuth);
               browserNavigate('/');
            } else {
               setFailedAuth(true)
            }
            setIsLoading(false);
         }, 2000);
      });
   };

   const closeAlert = () => {
      setFailedAuth(false)
   }

   return (
      <>
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
         { failedAuth ? 
            <Alert type={'error'} close={closeAlert}>
               Usuario o contraseña incorrectos.<br/>¡Intente de nuevo!
            </Alert> : null
         }  
      </>
   );
};

export default Login;
