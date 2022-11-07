import './SectionTitle.scss';

const SectionTitle = ({ children, underline = false }) => {
   return <h2 className={`db-section-title ${underline && 'with-underline'}`}>{children}</h2>;
};

export default SectionTitle;
