import { SummaryForm } from "./SummaryForm";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderDetails({setStep}) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);

  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings =totals.toppings > 0 ;
  let toppingsDisplay = null;

  if(hasToppings){

    const toppingArray = Object.keys(optionCounts.toppings);
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

    toppingsDisplay = (
      
      <>
        <h2>Toppings Summary: {formatCurrency(totals.toppings)}</h2> 
        <ul>{toppingList}</ul>
      </>
    );
  }

  

  return (
    <div>
      <h1> Review Order </h1>
      <h2>Scoops Summary: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <h2>Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <SummaryForm setStep = {setStep} />
    </div>
  );
}
