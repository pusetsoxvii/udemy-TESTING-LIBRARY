import { screen, render, userEvent } from "@testing-library/react";
import App from "./App";
import { beforeEach, describe, expect, it } from "vitest";

describe("Order phases for Golden Path", () => {
    const user = userEvent.setup(); 
    beforeEach(() => {
        render(<App/>);
    });

    it('add ice cream and toppings', async () => {
        // Fixed typo: getByrole -> getByRole
        const vanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i});
        const chocolateCheckbox = screen.getByRole('checkbox', {name: /chocolate/i}); 
        
        await user.click(vanillaCheckbox); 
        await user.click(chocolateCheckbox); 
        
        const sprinklesCheckbox = screen.getByRole('checkbox', {name: /sprinkles/i}); 
        const nutsCheckbox = screen.getByRole('checkbox', {name: /nuts/i}); 
        
        await user.click(sprinklesCheckbox);
        await user.click(nutsCheckbox);
        
        // Verify selections are checked
        expect(vanillaCheckbox).toBeChecked();
        expect(chocolateCheckbox).toBeChecked();
        expect(sprinklesCheckbox).toBeChecked();
        expect(nutsCheckbox).toBeChecked();
    });

    it('find and click order button', async () => {
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);

        // Fixed: ScreenOrientation -> screen
        const summaryPageHeading = screen.getByRole("heading", {name: /review order/i});
        expect(summaryPageHeading).toBeInTheDocument();

        const scoopsSummary = screen.getByRole("heading", {name: /scoops summary/i});
        expect(scoopsSummary).toBeInTheDocument();

        const toppingsSummary = screen.getByRole("heading", {name: /toppings summary/i});
        expect(toppingsSummary).toBeInTheDocument();

        const orderTotal = screen.getByRole("heading", {name: /total/i});
        expect(orderTotal).toBeInTheDocument();

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        expect(termsCheckbox).toBeInTheDocument();
        expect(termsCheckbox).not.toBeChecked();
        
        const confirmOrderButton = screen.getByRole("button", {name: /confirm order/i});
        expect(confirmOrderButton).toBeDisabled();

        const popOverHidden = screen.queryByText(/no real ice cream to deliver/i);
        expect(popOverHidden).not.toBeInTheDocument();
    });

    it('check summary information based on order', async () => { 
        // Fixed typo: getByrole -> getByRole
        const vanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i});
        const chocolateCheckbox = screen.getByRole('checkbox', {name: /chocolate/i}); 
        const sprinklesCheckbox = screen.getByRole('checkbox', {name: /sprinkles/i}); 
        
        // Select items first
        await user.click(chocolateCheckbox); 
        await user.click(sprinklesCheckbox); 

        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        // Verify the selected items appear in summary
        expect(screen.getByText(/chocolate/i)).toBeInTheDocument();
        expect(screen.getByText(/sprinkles/i)).toBeInTheDocument();
        
        // Go back and add vanilla (if supported by the app)
        // Note: This depends on your app's navigation flow
        const backButton = screen.queryByRole("button", {name: /back|edit order/i});
        if (backButton) {
            await user.click(backButton);
            await user.click(vanillaCheckbox);
        }
    });

    it('accept terms and conditions and click button to confirm order', async () => { 
        // Fixed typo: getByrole -> getByRole
        const vanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i}); 
        await user.click(vanillaCheckbox); 

        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);  

        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        // Fixed: click termsCheckbox instead of orderSummaryButton
        await user.click(termsCheckbox); 
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        expect(confirmButton).toBeEnabled();
        await user.click(confirmButton);
        
        // Verify we're on confirmation page
        const confirmationHeading = await screen.findByRole("heading", {name: /order confirmed|confirmation/i});
        expect(confirmationHeading).toBeInTheDocument();
    });
    
    it('confirm order number on confirmation page', async () => { 
        const vanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i});
        await user.click(vanillaCheckbox); 
        
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);  
        
        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox);
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        await user.click(confirmButton);
        
        // Wait for and verify order number appears
        const orderNumber = await screen.findByText(/order number|order #/i);
        expect(orderNumber).toBeInTheDocument();
        
        // Verify order number has a valid format (assuming it's a number)
        const orderNumberText = orderNumber.textContent;
        expect(orderNumberText).toMatch(/\d+/);
    });

    it('click new order button on confirmation page', async () => {
        // Complete the test implementation
        const vanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i});
        await user.click(vanillaCheckbox);
        
        const orderSummaryButton = screen.getByRole("button", {name: /view order/i});
        await user.click(orderSummaryButton);
        
        const termsCheckbox = screen.getByRole('checkbox', {name: /terms.*conditions|agree.*terms/i});
        await user.click(termsCheckbox);
        
        const confirmButton = screen.getByRole('button', {name: /confirm order|place order|submit order/i});
        await user.click(confirmButton);
        
        // Click new order button
        const newOrderButton = await screen.findByRole("button", {name: /new order|create new order/i});
        await user.click(newOrderButton);
        
        // Verify we're back to the initial ordering page
        const orderPageHeading = await screen.findByRole("heading", {name: /order|select/i});
        expect(orderPageHeading).toBeInTheDocument();
        
        // Verify form is reset
        const resetVanillaCheckbox = screen.getByRole('checkbox', {name: /vanilla/i});
        expect(resetVanillaCheckbox).not.toBeChecked();
    });

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

        const orderButton = screen.getByRole("button", {name: /order sundae/i});
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

        // Additional reset verification
        const resetChocolateInput = screen.getByRole("spinbutton", {name: "Chocolate"});
        expect(resetChocolateInput).toHaveValue(0);
        
        const resetHotFudgeCheckbox = screen.getByRole("checkbox", {name: "Hot fudge"});
        expect(resetHotFudgeCheckbox).not.toBeChecked();
    });
});
