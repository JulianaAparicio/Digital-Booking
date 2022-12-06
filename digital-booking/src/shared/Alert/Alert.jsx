import Card from '../Card/Card';
import CloseIcon from '../Icons/CloseIcon';
import ExclamationIcon from '../Icons/ExclamationIcon';
import './Alert.scss';

export default function Alert({ type, children, close }) {
    return (
        <div className={`db-alert`} onClick={close}>
            <Card>
                <div className={`db-alert-content ${type}`}>
                    <div className='db-exclamation-icon'>
                        <ExclamationIcon />
                    </div>
                    {children}
                    <div className='db-close-icon'>
                        <CloseIcon />
                    </div>
                </div>
            </Card>
        </div>
    )
}