import  { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import { Button } from "react-bootstrap";


export default function OrderConfirmation({ setStep }) { 
const {resetOrder} = useOrderDetails();
const [orderNumber, setOrderNumber] = useState(null);

   useEffect(() => {

         axios.post(`http://localhost:3030/order`)
         .then((response) =>{
            setOrderNumber(response.data.orderNumber);
         })
         .catch((error)=>{

         })

   }, []); 
    function handleClick() {
        resetOrder();
        setStep("order");
    }

    if (orderNumber) {return (
    <div>
      <h1>Thank you!</h1>
      <p>Your order number: {orderNumber}</p>
      <Button onClick={handleClick}>create new order</Button>
    </div>
  );} else {
    return ( <div>loading...</div>);
    }
}
