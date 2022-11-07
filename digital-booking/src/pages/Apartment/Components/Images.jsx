import gsap from 'gsap';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactImageGallery from 'react-image-gallery';

const Images = ({ images, imageIndex }) => {
   const [indexSelected, setIndex] = useState(0);

   const imagesViewer = useRef();

   const openViewer = () => {
      imagesViewer.current.classList.remove('hidden');
   };

   const closeViewer = () => {
      imagesViewer.current.classList.add('hidden');
   };

   useEffect(() => {
      const imagesAnimation = gsap.from('.db-desktop-images-container img', {
         delay: 0.5,
         opacity: 0,
         stagger: 0.1,
      });

      document.querySelectorAll('.image-gallery-thumbnail-image').forEach((image, i) => {
         image.addEventListener('click', () => setIndex(i));
      });

      return () => {
         imagesAnimation.revert();
      };
   }, []);

   return (
      <>
         <section className="db-apartment-images">
            <div className="db-mobile-gallery">
               <div className="db-mobile-images-container">
                  {images.map((image, i) => (
                     <img
                        key={image.url}
                        data-index={i + 1}
                        className="db-mobile-images"
                        src={image.url}
                        alt={image.label}
                     />
                  ))}
               </div>
               <div className="db-images-counter">
                  <p>
                     {imageIndex}/{images.length}
                  </p>
               </div>
            </div>
            <div onClick={openViewer} className="db-desktop-gallery">
               <div className="db-desktop-images-container">
                  {images.slice(0, 5).map((image, i) => (
                     <img
                        onClick={() => setIndex(i)}
                        key={image.url}
                        className="db-desktop-images"
                        src={image.url}
                        alt={image.label}
                     />
                  ))}
               </div>
               <button className="db-toggle-button">Ver mas</button>
            </div>
         </section>
         <div ref={imagesViewer} className="db-imagesViewer hidden">
            <ReactImageGallery
               showPlayButton={false}
               startIndex={indexSelected}
               items={images.map(image => {
                  return {
                     original: image.url,
                     thumbnail: image.url,
                  };
               })}
            />
            <button onClick={closeViewer} className="db-toggle-button">
               Cerrar
            </button>
         </div>
      </>
   );
};

export default Images;
