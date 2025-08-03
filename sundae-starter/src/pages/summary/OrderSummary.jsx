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

  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1> Review Order </h1>
      <h2>Scoops Summary: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings Summary: {formatCurrency(totals.toppings)}</h2> 
      <ul>{toppingList}</ul>
      <h2>Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <SummaryForm setStep = {setStep} />
    </div>
  );
}
