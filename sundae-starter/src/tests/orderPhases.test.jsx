import { screen, render, userEvent } from "@testing-library";
import App from "./App";
import { beforeEach, describe, expect, it } from "vitest";

describe("Order phases for Golden Path", () =>{
    const user = userEvent.setup(); 
    beforeEach(()=>{
        render(<App/>);
    });

    it('add ice cream and toppings',async()=>{
        
        const vanillaCheckbox = screen.getByrole('checkbox',{name:/vanilla/i});
        const chocolateCheckbox = screen.getByrole('checkbox',{name:/chocolate/i}); 
        
        await user.click(vanillaCheckbox); 
        await user.click(chocolateCheckbox); 
        
        const sprinklescheckbox = screen.getByRole('checkbox',{name:/sprinkles/i}); 
        const nutscheckbox = screen.getByRole('checkbox',{name:/nuts/i}); 

    });
    it('find and click order button', async()=>{
        
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);

        const summaryPageHeading = ScreenOrientation.getByRole("heading", {name: /Review Order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading",{name: /scoop's summary/i});
        expect(scoopsSummary).toBeInTheDocument();

        const toppingsSummary = screen.getByRole("heading", {name: /topping's summary/i})
        expect(toppingsSummary).toBeInTheDocument();

        const orderTotal = screen.getByRole("heading", {name: /total/i})
        expect(orderTotal).toBeInTheDocument();

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        expect(termsCheckbox).toBeInTheDocument();
        expect(termsCheckbox).not.toBeChecked();
        
        const confirmOrderButton = screen.getByRole("button", {name: /confirm order/i});
        expect(confirmOrderButton).toBeDisabled();

        const popOverHidden = screen.getByText(/no real ice cream to deliver/i);
        expect(popOverHidden).not.toBeInTheDocument();
        
    });
    it('check summary information based on order',async()=>{ 
        const vanillaCheckbox = screen.getByrole('checkbox',{name:/vanilla/i});
        const chocolateCheckbox = screen.getByrole('checkbox',{name:/chocolate/i}); 
        const sprinklescheckbox = screen.getByRole('checkbox',{name:/sprinkles/i}); 
        
         
        await user.click(chocolateCheckbox); 
        await user.click (sprinklescheckbox); 

        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        await user.click(vanillaCheckbox);
    });
    it('accept terms and conditions and click button to confirn order', async() =>{ 
        const vanillaCheckbox = screen.getByrole('checkbox',{name:/vanilla/i}); 
        await user.click(vanillaCheckbox); 

        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);  

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(orderSummaryButton); 
        
        const confirmButton = screen.getByRole('button', { name: /confirm order|place order|submit order/i });
        await user.click(confirmButton);
        
        
    });
    
    it('confirm order number on confirmation page', async() =>{ 
        const vanillaCheckbox = screen.getByRole('checkbox', { name: /vanilla/i });
        await user.click(vanillaCheckbox); 
        
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);  
        
        const termsCheckbox = screen.getByRole('checkbox', { name: /terms.*conditions|agree.*terms/i });
        await user.click(termsCheckbox);
        
        const confirmButton = screen.getByRole('button', { name: /confirm order|place order|submit order/i });
        await user.click(confirmButton);
        

    });
    it('click new order button on confirmation page', ( ) =>{})
it("check for a reset", async () => {
  const user = userEvent.setup();
  render(<App />);

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  const newOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  const scoopsTotal = await screen.findByText("Scoops total: P0.00");
  const toppingsTotal = await screen.findByText("Toppings total: P0.00");

  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();
});
})  