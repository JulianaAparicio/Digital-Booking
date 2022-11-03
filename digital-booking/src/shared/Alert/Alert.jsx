import Card from '../Card/Card';
import CloseIcon from '../Icons/CloseIcon';
import './Alert.scss';

export default function Alert({type, children, close}) {
    return (
        <div className={`db-alert`} onClick={close}>
            <Card>
                <div className={`db-alert-content ${type}`}>
                    {children}
                    <CloseIcon/>
                </div>
            </Card>
            
        </div>
    )
}