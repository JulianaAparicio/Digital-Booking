import './Card.scss';

export default function Card ({classList, children}) {
    return (
        <div className={`db-card ${classList}`}>
            {children}
        </div>
    )
}
