import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../../core/Context';
import Input from '../../../shared/Input/Input';
import Button from '../../../shared/Button/Button';
import PlusIcon from './../../../shared/Icons/PlusIcon';
import { useState } from 'react';
import Amenity from './../../../shared/Amenity/Amenity';
import { useRef } from 'react';
import Card from '../../../shared/Card/Card';
import { StateContext } from '../CreateProduct';
import Alert from '../../../shared/Alert/Alert';

const amenities = ['wifi', 'tv', 'smoke', 'pool', 'pets', 'party', 'parking'];

const CreationForm = ({ isValid, submitProduct, amenities }) => {
   const context = useContext(Context);
   const states = useContext(StateContext);

   const filterAmenities = () =>
      amenities.filter(am => !states.amenities.state[0].some(am2 => am2 === am.id));

   const [visibleAmenities, setVisibleAmenities] = useState(() => filterAmenities());
   const [amenitySelected, setAmenitySelected] = useState(visibleAmenities.at(0) ?? null);

   const [imageUrl, setImageUrl] = useState('');
   const [imageInvalid, setImageInvalid] = useState(false);

   const addAmenity = () => {
      if (amenitySelected === null) return;

      states.amenities.state[1](last => {
         const aux = [...last];
         aux.push(amenitySelected);
         return aux;
      });

      setVisibleAmenities(filterAmenities);
   };

   const deleteAmenity = index => {
      states.amenities.state[1](last => {
         const aux = [...last];
         aux.splice(index, 1);
         return aux;
      });
   };

   //

   const addImages = () => {
      try {
         new URL(imageUrl);

         states.images.state[1](last => {
            const aux = [...last];
            aux.push(imageUrl);
            return aux;
         });
         setImageUrl('');
      } catch (error) {
         setImageInvalid(true);
      }
   };

   const deleteImage = e => {
      states.images.state[1](last => {
         const aux = [...last];
         aux.splice(e.target.dataset.index, 1);
         return aux;
      });
   };

   //

   useEffect(() => {
      setVisibleAmenities(filterAmenities);
   }, [states.amenities.state[0]]);

   useEffect(() => {
      setAmenitySelected(visibleAmenities.at(0)?.id);
   }, [visibleAmenities]);

   return (
      <>
         {imageInvalid && (
            <div className="alert-container">
               <Alert close={() => setImageInvalid(false)} type={'error'}>
                  La URL de la imagen que acabas de ingresar no es valida, por favor prueba con
                  otra.
               </Alert>
            </div>
         )}
         <div>
            <section className="db-title">Crear propiedad</section>
            <section className="db-inputs">
               <Card>
                  <article className="db-product-details">
                     <Input
                        id={'name'}
                        placeholder={'Hermiage Hotel'}
                        type={'text'}
                        label={'Nombre de la propiedad'}
                        setValue={states.name.state[1]}
                        name={'name'}
                     />
                     <Input
                        type="select"
                        setValue={states.category.state[1]}
                        label={'Categoría'}
                        options={context.categories.slice(0, 5).map(el => el.title)}
                        values={context.categories.slice(0, 5).map(el => el.id)}
                     />
                     <Input
                        placeholder={'Av. Colón 1643'}
                        type={'text'}
                        label={'Dirección'}
                        setValue={states.direction.state[1]}
                        name={'name'}
                     />
                     <Input
                        type="select"
                        setValue={states.city.state[1]}
                        values={context.cities.slice(1, -1).map(el => el.id)}
                        label={'Ciudad'}
                        options={context.cities.slice(1, -1).map(el => el.name)}
                     />

                     <Input
                        type="textarea"
                        setValue={states.description.state[1]}
                        label={'Descripción'}
                        placeholder={'Escriba aquí'}
                     />
                  </article>
                  <article className="db-product-amenities">
                     <h2>Agregar atributos</h2>
                     <div className="select-container">
                        <Input
                           type="select"
                           value={amenitySelected}
                           setValue={setAmenitySelected}
                           label={'Nombre'}
                           options={visibleAmenities.map(el => el.name)}
                           values={visibleAmenities.map(el => el.id)}
                           isDisabled={visibleAmenities.length <= 0}
                        />
                        <Button
                           isDisabled={visibleAmenities.length <= 0}
                           action={addAmenity}
                           classList="db-button-primary db-add-button">
                           <PlusIcon />
                        </Button>
                        {states.amenities.state[0].length ? (
                           <p>Haz click sobre un atributo para eliminarlo</p>
                        ) : (
                           ''
                        )}
                        <div className="amenities-selected">
                           {states.amenities.state[0].map((el, i) => {
                              const amenity = amenities.find($el => $el.id == el);
                              return (
                                 <div key={i} onClick={() => deleteAmenity(i)} data-index={i}>
                                    <Amenity
                                       data-index={i}
                                       type={amenity.name}
                                       label={amenity.name}
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </article>
                  <article className="db-product-highlights">
                     <h2>Políticas del producto</h2>
                     <div className="inputs">
                        <Input
                           type="textarea"
                           setValue={e => states.rules.state[1](e.split('_').map(string => string))}
                           label={'Normas de la casa'}
                           placeholder="Separe cada indicación con un guión bajo ( _ )"
                        />
                        <Input
                           type="textarea"
                           setValue={e =>
                              states.security.state[1](e.split('_').map(string => string))
                           }
                           label={'Salud y seguridad'}
                           placeholder="Separe cada indicación con un guión bajo ( _ )"
                        />
                        <Input
                           type="textarea"
                           setValue={e =>
                              states.cancellation.state[1](e.split('_').map(string => string))
                           }
                           label={'Política de cancelación'}
                           placeholder="Separe cada indicación con un guión bajo ( _ )"
                        />
                     </div>
                  </article>
                  <article className="db-product-images">
                     <h2>Cargar imágenes</h2>
                     <div className="input-container">
                        <Input
                           type="text"
                           label={'Ingresa la URL de la imagen'}
                           setValue={setImageUrl}
                           options={amenities}
                           value={imageUrl}
                           placeholder={'Insertar https://'}
                        />
                        <Button action={addImages} classList="db-button-primary db-add-button">
                           <PlusIcon />
                        </Button>
                     </div>
                     {states.images.state[0].length ? (
                        <p>Haz click sobre una imagen para eliminarla</p>
                     ) : null}
                     <div className="images-container">
                        {states.images.state[0].map((a, i) => (
                           <div
                              data-index={i}
                              onClick={deleteImage}
                              className="image-preview"
                              key={i}>
                              <Card>
                                 <img src={a} data-index={i} alt={`product image ${i + 1}`} />
                                 <p>
                                    {`Imagen numero ${i + 1}${
                                       i === 0 ? ', esta imagen será la portada.' : '.'
                                    }`}
                                 </p>
                              </Card>
                           </div>
                        ))}
                     </div>
                  </article>
                  <article className="db-button-container">
                     <Button
                        action={submitProduct}
                        isDisabled={!isValid}
                        classList="db-button-primary animations-excent">
                        Crear
                     </Button>
                  </article>
               </Card>
            </section>
         </div>
      </>
   );
};

export default CreationForm;
