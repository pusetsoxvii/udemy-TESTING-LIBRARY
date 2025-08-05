import Options from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry( {setStep} ){
    const { totals} = useOrderDetails();

    const orderDisabled = totals.scoops === 0;
    return(
    <div>
        <h1>Design Your Sundae!</h1>
        <Options optionType='scoops'/>
        <h3>Scoops total: {formatCurrency(totals.scoops)}</h3>
        <Options optionType='toppings/'/>
        <h3>Toppings total: {formatCurrency(totals.toppings)}</h3>
        <h2>Totals:{formatCurrency(totals.scoops+totals.toppings)} </h2>;
        <Button disabled={orderDisabled} onClick={()=>setStep("summary")}  >view order</Button>
    </div>);
}