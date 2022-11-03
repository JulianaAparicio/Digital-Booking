import './Button.scss';

export default function Button ({classList, action, isDisabled, children}) {
    const buttonClass = `db-button ${classList} ${isDisabled ? 'db-button-disabled' : null}`;
    return (
        <button className={buttonClass} onClick={action} disabled={isDisabled}>
            {children}
        </button>
    )
}