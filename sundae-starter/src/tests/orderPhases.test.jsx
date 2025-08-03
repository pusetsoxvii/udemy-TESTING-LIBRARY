import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { describe, expect, it } from "vitest";

describe("Order phases for Golden Path", () => {
    

    it('add ice cream and toppings', async () => {
        render(<App />);
        const user = userEvent.setup();
        
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

    
        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
    });

    it('find and click order button', async () => {
        render(<App />);
        const user = userEvent.setup();  

          const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);

        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

    });

    it('check summary information based on order', async () => { 
       render(<App />);
        const user = userEvent.setup(); 
      
         const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();
        expect(scoopsSummary).toHaveTextContent("2.00");

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();
        expect(toppingsSummary).toHaveTextContent("1.50")

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("3.50");
        
    });

    it('accept terms and conditions and click button to confirm order', async () => { 
       render(<App />);
        const user = userEvent.setup(); 

        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();
        expect(scoopsSummary).toHaveTextContent("2.00");

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();
        expect(toppingsSummary).toHaveTextContent("1.50")

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("3.50");

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox); 
        expect(termsCheckbox).toBeChecked();
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        expect(confirmButton).toBeEnabled();
        await user.click(confirmButton);

        const confirmationLoading = screen.getByText(/loading.../i);
        expect(confirmationLoading).toBeInTheDocument();
        
        // Verify we're on confirmation page
        const confirmationHeading = await screen.findByRole("heading", {name: /Thank You!/i});
        expect(confirmationHeading).toBeInTheDocument();
    });
    
    it('confirm order number on confirmation page', async () => { 
        render(<App />);
        const user = userEvent.setup();

       const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();
        expect(scoopsSummary).toHaveTextContent("2.00");

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();
        expect(toppingsSummary).toHaveTextContent("1.50")

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("3.50");

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox); 
        expect(termsCheckbox).toBeChecked();
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        expect(confirmButton).toBeEnabled();
        await user.click(confirmButton);
        
        // Verify we're on confirmation page
        const confirmationHeading = await screen.findByRole("heading", {name: /Thank You!/i});
        expect(confirmationHeading).toBeInTheDocument();

      
        // Wait for and verify order number appears
        const createdOrderNumber = await screen.findByText(/Your order number: \d+/i);
        expect(createdOrderNumber).toBeInTheDocument();
    });

    it('click new order button on confirmation page', async () => {
       render(<App />);
        const user = userEvent.setup();

       const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();
        expect(scoopsSummary).toHaveTextContent("2.00");

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();
        expect(toppingsSummary).toHaveTextContent("1.50")

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("3.50");

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox); 
        expect(termsCheckbox).toBeChecked();
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        expect(confirmButton).toBeEnabled();
        await user.click(confirmButton);
        
        // Verify we're on confirmation page
        const confirmationHeading = await screen.findByRole("heading", {name: /Thank You!/i});
        expect(confirmationHeading).toBeInTheDocument();
       
        // Wait for and verify order number appears
        const createdOrderNumber = await screen.findByText(/Your order number: \d+/i);
        expect(createdOrderNumber).toBeInTheDocument();

        const newOrderButton = screen.getByRole("button", {name: /create new order/i});
        expect(newOrderButton).toBeInTheDocument();
        await user.click(newOrderButton);

        // Verify we are back on the order page
        const pageHeading = await screen.findByRole("heading", {name: /Design your sundae!/i});
        expect(pageHeading).toBeInTheDocument(); 
    });

    it("check for a reset", async () => {
        render(<App />);
        const user = userEvent.setup();

        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        const cherriesCheckbox = screen.getByRole('checkbox', {name: /cherries/i}); 
        await user.click(cherriesCheckbox);
       
        expect(cherriesCheckbox).toBeChecked();
      
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();
        expect(scoopsSummary).toHaveTextContent("2.00");

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();
        expect(toppingsSummary).toHaveTextContent("1.50")

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();
        expect(orderTotal).toHaveTextContent("3.50");

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox); 
        expect(termsCheckbox).toBeChecked();
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        expect(confirmButton).toBeEnabled();
        await user.click(confirmButton);
        
        // Verify we're on confirmation page
        const confirmationHeading = await screen.findByRole("heading", {name: /Thank You!/i});
        expect(confirmationHeading).toBeInTheDocument();
       
        // Wait for and verify order number appears
        const createdOrderNumber = await screen.findByText(/Your order number: \d+/i);
        expect(createdOrderNumber).toBeInTheDocument();

        const newOrderButton = screen.getByRole("button", {name: /create new order/i});
        expect(newOrderButton).toBeInTheDocument();
        await user.click(newOrderButton);

        // Verify we are back on the order page
        const pageHeading = await screen.findByRole("heading", {name: /Design your sundae!/i});
        expect(pageHeading).toBeInTheDocument();


        // Additional reset verification
        const resetvanillaInput = screen.getByRole("spinbutton", {name: "Vanilla"});
        expect(resetvanillaInput).toHaveValue(0);
        
        const resetcherriesCheckbox = screen.getByRole("checkbox", {name: "Cherries"});
        expect(resetcherriesCheckbox).not.toBeChecked();
    });
});
