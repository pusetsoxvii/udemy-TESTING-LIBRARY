import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { screen, render } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { expect } from "vitest";
import userEvent from '@testing-library/user-event'

test("handles errors for scoops and toppings routes", async() => {
    server.resetHandlers(
        http.get('http://localhost:3030/scoops', () =>{
            return new HttpResponse( null, {status: 500});
        }),
        http.get('http://localhost:3030/toppings', () =>{
            return new HttpResponse(null, {status: 500});
        })        
    );

    render(<OrderEntry/>);
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);


});

test("disable order button if there are no scoops ordered",async() =>{
        const user = userEvent.setup();
        render(<OrderEntry setOrderPhase={vi.fn()}/>);

        const orderButton = screen.getByRole('button', {name: /view order/i});
        expect(orderButton).toBeDisabled();

        const vanillaInput = await screen.findByRole("spinbutton",{name: /vanilla/i});
        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');
        expect(orderButton).toBeEnabled();

         await user.clear(vanillaInput);
        await user.type(vanillaInput, '0');
        expect(orderButton).toBeDisabled();
});
