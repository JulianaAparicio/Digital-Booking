import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Apartment.scss';
import Amenities from './Components/Amenities';
import Description from './Components/Description';
import Availability from './Components/Availability';
import Highlights from './Components/Highlights';
import Images from './Components/Images';
import gsap from 'gsap';
import { getProductById } from '../../core/services/Product';
import HeaderApartment from './Components/HeaderApartment';
import Location from './Components/Location';

const product = {
   image: {
      url: 'https://construccionesprisma.com.co/images/apartment_photos/22_41_pradoalto97.5m201.jpg',
      productName: 'apto1',
   },
   info: {
      title: 'Alojate en el corazón de San Telmo',
      category: 'Departamentos',
      points: 8,
      textRate: 'Muy bueno',
      distance: 'A 900 m del centro',
      location: 'MDE',
      detailed_description:
         'Está situado a solo unas calles de la avenida Alvear, de la avenida Quintana, del parque San Martín y del distrito de Recoleta. En las inmediaciones también hay varios lugares de interés, como la calle Florida, el centro comercial Galerías Pacífico, la zona de Puerto Madero, la plaza de Mayo y el palacio Municipal. Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes. El Hotel es un hotel sofisticado de 4 estrellas que goza de una ubicación tranquila, a poca distancia de prestigiosas galerías de arte, teatros, museos y zonas comerciales. Además, hay WiFi gratuita. El establecimiento sirve un desayuno variado de 07:00 a 10:30.',
      amenities: ['wifi', 'pool'],
      description:
         'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.',
   },
   gallery: [
      {
         url: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
         label: 'breakfast',
      },
      {
         url: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
         label: 'gym',
      },
      {
         url: 'https://images.pexels.com/photos/8449824/pexels-photo-8449824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
         label: 'jacuzzi',
      },
      {
         url: 'https://images.pexels.com/photos/7587466/pexels-photo-7587466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
         label: 'sauna',
      },
   ],
   highlights: [
      {
         title: 'Normas de la casa',
         items: ['Check-out: 10:00', 'No se permiten fiestas', 'No fumar'],
      },
      {
         title: 'Salud y seguridad',
         items: [
            'Se aplican las pautas de distanciamiento social y otras normas relacionadas con el coronavirus',
            'Detector de humo',
            'Depósito de seguridad',
         ],
      },
      {
         title: 'Política de cancelación',
         items: ['Check-out: 10:00', 'No se permiten fiestas', 'No fumar'],
      },
   ],
};

const Apartment = () => {
   const { apartmentId } = useParams();
   const [currentProduct, setCurrentProduct] = useState(null);

   const [imageIndex, setImageIndex] = useState(1);

   const getProduct = async () => {
      await getProductById(apartmentId).then((product) => setCurrentProduct(product));
   }

   useEffect(() => {

      getProduct();

      
      const mobileImagesObserver = new IntersectionObserver(
         entries => {
            entries.forEach(entry => {
               entry.intersectionRatio >= 0.6 &&
                  setImageIndex(parseInt(entry.target.dataset.index));
            });
         },
         { threshold: 0.6 }
      );

      const mobileImages = document.querySelectorAll('.db-mobile-images-container img');

      mobileImages.forEach(image => mobileImagesObserver.observe(image));

      setImageIndex(1);

      const sectionsAnimation = gsap.from('.db-apartment-container section', {
         delay: 0.2,
         opacity: 0,
         yPercent: 20,
         stagger: 0.2,
      });

      return () => {
         mobileImages.forEach(image => mobileImagesObserver.unobserve(image));
         sectionsAnimation.revert();
      };
   }, []);

   return (
      <>
         {
            currentProduct ? 
         
            <div className="db-apartment-container">
               <HeaderApartment title={currentProduct.title} category={currentProduct.category.title}/>
               <Location location={currentProduct.location}/>
               <Images imageIndex={imageIndex} images={[currentProduct.images[0], ...currentProduct.images.slice(1)]} />
               <Description title={currentProduct.title}>{currentProduct.description}</Description>
               <Amenities amenities={currentProduct.amenities} />
               <Availability disabledDays={['2022/11/25','2022/11/26','2022/11/27']} />
               <section className="db-apartment-map"></section>
               <Highlights highlights={currentProduct.items} />
            </div> : null
         }
      </>
   );
};

export default Apartment;
