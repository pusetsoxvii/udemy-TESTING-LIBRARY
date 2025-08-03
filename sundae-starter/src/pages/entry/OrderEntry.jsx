import Options from "./Options";
import {useOrderDetails} from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry( {setStep} ){
    const { totals} = useOrderDetails();

    return(
    <div>
        <h1>Design Your Sundae!</h1>
        <Options optionType='scoops'/>
        <Options optionType='toppings/'/>
        <h2>Totals:{formatCurrency(totals.scoops+totals.toppings)} </h2>;
        <Button onClick={()=>setStep("summary")}  >view order</Button>
    </div>);
}