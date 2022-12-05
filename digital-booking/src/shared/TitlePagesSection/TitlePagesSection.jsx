import BackButtonIcon from "../../shared/Icons/BackButtonIcon";
import { useNavigate } from "react-router-dom";
import "./TitlePagesSection.scss"

export default function TitlePagesSection ({title1, title2}) {
    const browserNavigate = useNavigate();

    const goBack = () => {
        browserNavigate(-1);
    }

    return (
        <div className="db-title-pages-section ">
            <div>
                <h4>
                    {title1}
                </h4>
                <h1>{title2}</h1>
            </div>
            <div onClick={goBack}>
                <BackButtonIcon/>
            </div>
        </div>
    )
}