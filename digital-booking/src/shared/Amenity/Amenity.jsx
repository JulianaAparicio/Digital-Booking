import './Amenity.scss';
import WifiIcon from './../Icons/WifiIcon';
import TvIcon from './../Icons/TvIcon';
import SmokeIcon from './../Icons/SmokeIcon';
import PoolIcon from './../Icons/PoolIcon';
import PetsIcon from './../Icons/PetsIcon';
import PartyIcon from './../Icons/PartyIcon';
import ParkingIcon from './../Icons/ParkingIcon';
import KitchenIcon from '../Icons/KitchenIcon';

const Amenity = ({ type, label = false }) => {
   return (
      <div className="db-svg-container">
         <Svg type={type} />
         {label && <span className="label">{label}</span>}
      </div>
   );
};

const Svg = ({ type }) => {
   switch (type.toLowerCase()) {
      case 'wifi':
         return <WifiIcon />;
      case 'tv':
         return <TvIcon />;
      case 'smoke':
         return <SmokeIcon />;
      case 'pool':
         return <PoolIcon />;
      case 'pets':
         return <PetsIcon />;
      case 'party':
         return <PartyIcon />;
      case 'parking':
         return <ParkingIcon />;
      case 'kitchen':
         return <KitchenIcon />;
      default:
         console.error('amenity type not found');
         return null;
   }
};

export default Amenity;
