import Button from "../../../shared/Button/Button";
import Card from "../../../shared/Card/Card";

export default function Reservation() {
    return (
        <Card classList={'db-card-reservation'}>
            <div className="db-reservation">
                <div>
                    Agregá fecha de tus viajes para obtener precios exactos
                </div>
                <Button classList={'db-button-primary'}>Iniciar Reserva</Button>
            </div>
        </Card>
    )
}