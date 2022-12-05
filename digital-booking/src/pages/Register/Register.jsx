import { useContext, useState } from 'react';
import MainCenterLayout from '../../shared/Layouts/MainCenterLayout/MainCenterLayout';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Spinner from '../../shared/Spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getValidationErrors, passwordConfirmValidation } from '../../utils/validationErrors';
import { formStateValidation } from '../../utils/formStateMapper';
import registerUser from '../../core/services/Users';
import { loginUser } from '../../core/services/Auth';
import { decodeToken, setToken } from '../../core/services/Token';
import Alert from '../../shared/Alert/Alert';
import { Context } from '../../core/Context';

const Register = () => {
   const browserNavigate = useNavigate();
   const appContext = useContext(Context);


   const [isLoading, setIsLoading] = useState(false);
   const [failedAuth, setFailedAuth] = useState(false);
   const [failedAuthError, setFailedAuthError] = useState('');


   const registerForm = {
      name: { state: useState(), isValid: useState(false) },
      lastName: { state: useState(), isValid: useState(false) },
      email: { state: useState(), isValid: useState(false) },
      password: { state: useState(), isValid: useState(false) },
      passwordConfirm: { state: useState(), isValid: useState(false) },
      role: { state: useState('USER'), isValid: useState(appContext.user && appContext.user.role === 'ADMIN' ? false : true) },
   };

   const registerNewUser = () => {
      setIsLoading(true);
      registerUser(registerForm).then((user) => {
         if (appContext.user && appContext.user.role === 'ADMIN') {
            alert('Usuario registrado con exito');
            browserNavigate('/');
         } else {
            loginUser({email: registerForm.email, password: registerForm.password}).then(data => {
               setToken(data);
               appContext.setUser(decodeToken());
               browserNavigate('/');
            }).catch(({response}) => {
               setFailedAuth(true);
               setFailedAuthError(response.data.message);
            }).finally(() => setIsLoading(false));
         }
         
      }).catch(({response}) => {
         setFailedAuth(true);
         setFailedAuthError(response.data.message);
      });
   };

   const closeAlert = () => {
      setFailedAuth(false)
   }

   return (
      <>
         <MainCenterLayout>
            <div className="db-register">
               <h1 className="db-form-title">Crear cuenta</h1>
               {appContext.user && appContext.user.role !== 'ADMIN' ?
               <Input
                  type="select"
                  value={registerForm.role.state[0]}
                  setValue={registerForm.role.state[1]}
                  label={'Tipo de usuario'}
                  options={['USER', 'ADMIN']}
                  errors={getValidationErrors('select', true)}
                  setInputValidation={registerForm.role.isValid[1]}
               /> : null }
               <div className="db-form-row">
                  <Input
                     id={'name'}
                     placeholder={''}
                     type={'text'}
                     label={'Nombre'}
                     errors={getValidationErrors('text', false)}
                     setValue={registerForm.name.state[1]}
                     name={'name'}
                     setInputValidation={registerForm.name.isValid[1]}
                  />
                  <Input
                     id={'lastName'}
                     placeholder={''}
                     type={'text'}
                     label={'Apellido'}
                     errors={getValidationErrors('text', false)}
                     setValue={registerForm.lastName.state[1]}
                     name={'lastName'}
                     setInputValidation={registerForm.lastName.isValid[1]}
                  />
               </div>
               <Input
                  id={'email'}
                  placeholder={''}
                  type={'email'}
                  label={'Correo Electronico'}
                  errors={getValidationErrors('email', true)}
                  setValue={registerForm.email.state[1]}
                  name={'email'}
                  setInputValidation={registerForm.email.isValid[1]}
               />
               <Input
                  id={'password'}
                  placeholder={''}
                  type={'password'}
                  label={'Contraseña'}
                  errors={getValidationErrors('password', true)}
                  setValue={registerForm.password.state[1]}
                  name={'password'}
                  setInputValidation={registerForm.password.isValid[1]}
               />
               <Input
                  id={'passwordConfirm'}
                  placeholder={''}
                  type={'password'}
                  label={'Confirmar contraseña'}
                  errors={[
                     ...getValidationErrors('password', true),
                     ...passwordConfirmValidation(registerForm.password.state[0]),
                  ]}
                  setValue={registerForm.passwordConfirm.state[1]}
                  name={'passwordConfirm'}
                  setInputValidation={registerForm.passwordConfirm.isValid[1]}
               />

               <Button
                  classList={'db-button-primary db-button-small'}
                  action={registerNewUser}
                  isDisabled={!formStateValidation(registerForm)}>
                  {isLoading ? <Spinner /> : null}
                  Crear cuenta
               </Button>
               <div className="db-form-footer">
                  <span>¿Ya tienes una cuenta? </span>
                  <Link to={'/login'}>
                     <span>Iniciar Sesión</span>
                  </Link>
               </div>
            </div>
         </MainCenterLayout>
         { failedAuth ? 
            <Alert type={'error'} close={closeAlert}>
               {failedAuthError}.<br/>¡Intente de nuevo!
            </Alert> : null
         } 
      </>
   );
};

export default Register;
