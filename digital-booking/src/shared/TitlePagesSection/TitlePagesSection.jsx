import BackButtonIcon from "../../shared/Icons/BackButtonIcon";
import { useNavigate } from "react-router-dom";
import "./TitlePagesSection.scss"

export default function TitlePagesSection ({title, subtitle}) {
    const browserNavigate = useNavigate();

    const goBack = () => {
        browserNavigate(-1);
    }

    return (
        <div className="db-title-pages-section ">
            <div>
                <h4>
                    {subtitle}
                </h4>
                <h1>{title}</h1>
            </div>
            <div onClick={goBack}>
                <BackButtonIcon/>
            </div>
        </div>
    )
}