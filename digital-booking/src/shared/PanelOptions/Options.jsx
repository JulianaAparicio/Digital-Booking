import './PanelOptions.scss';

export default function Option({id, icon, title, subtitle, action}) {
    
    const selectedOption = () => {
        action({id, title})
    }

    return (
        <div className="db-option" onClick={selectedOption}>
            { icon ? <span className="db-option-icon" >{icon}</span> : null }
            <div className="db-option-item">
                <span className="db-option-item-title">{title}</span>
                <span className="db-option-item-subtitle">{subtitle}</span>
            </div>
        </div>
    )
}