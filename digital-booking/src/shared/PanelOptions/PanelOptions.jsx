import Card from "../Card/Card"
import Option from "./Options"
import './PanelOptions.scss';

export default function PanelOptions({items, selectOption}) {

    return (
        <Card classList={'db-card-options'}>
            <div className="db-panel-options">
                {
                    items.map((item) => 
                        <Option key={item.id} {...item} action={selectOption}/>
                    )
                }
            </div>
        </Card>
    )

}