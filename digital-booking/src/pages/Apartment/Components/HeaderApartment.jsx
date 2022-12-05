import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../shared/Icons/BackButtonIcon";

export default function HeaderApartment ({category, title}) {
    const browserNavigate = useNavigate();

    const goBack = () => {
        browserNavigate(-1);
    }

    return (
        <div className="db-apartment-header">
            <div>
                <h4>
                    {category}
                </h4>
                <h1>{title}</h1>
            </div>
            <div onClick={goBack}>
                <BackButtonIcon/>
            </div>
        </div>
    )
}