import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";
import OrderDetails from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";



function App() {
  
        const [step, setStep] = useState("order");// order, summary, confirmation

        let Component = step

        switch (step) {
          case 'order':
            Component = OrderEntry;
            break;

          case 'summary':
            Component = OrderDetails;
            break;
          
            case 'confirmation':
              Component = OrderConfirmation
              ;
              break;
          default:
            break;
        }



  /*const [scoops, setScoops] = useState({ vanilla: false, chocolate: false, chocolateCount: 0 });
const [toppings, setToppings] = useState({ sprinkles: false, nuts: false, hotFudge: false });
  const [step, setStep] = useState("order"); // order, summary, confirmation
  const [agreed, setAgreed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleScoopChange = (e) => {
    const { name, checked } = e.target;
    setScoops((prev) => ({ ...prev, [name]: checked }));
  };

  const handleScoopCountChange = (e) => {
    setScoops((prev) => ({ ...prev, chocolateCount: Number(e.target.value) }));
  };

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    setToppings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleViewOrder = () => setStep("summary");

  const handleConfirm = async () => {
    const res = await fetch("/api/order", { method: "POST" });
    const data = await res.json();
    setOrderNumber(data.orderNumber);
    setStep("confirmation");
  };

  const handleNewOrder = () => {
    setScoops({ vanilla: false, chocolate: false, chocolateCount: 0 });
    setToppings({ sprinkles: false, nuts: false, hotFudge: false });
    setAgreed(false);
    setOrderNumber(null);
    setStep("order");
  };

  const scoopsTotal =
    (scoops.vanilla ? 1 : 0) * 20 + scoops.chocolateCount * 20;
  const toppingsTotal = Object.values(toppings).filter(Boolean).length * 5;*/

  return (

    <Container>
        <OrderDetailsProvider>
          <Component setStep={setStep}/>
        </OrderDetailsProvider>
    </Container>
  );
      
}

export default App;