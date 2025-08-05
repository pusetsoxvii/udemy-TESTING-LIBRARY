import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { expect } from "vitest";
import userEvent from '@testing-library/user-event'

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scooopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scooopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scooopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("don't update total if scoops input is valid", async() => {
  const user = userEvent.setup();

  render(<Options optionType='scoops' />);

  const vanillaInput = await screen.findByRole('spinbutton',{name: 'Vanilla'});
  const scoopsSubtotal = screen.getByText(/Scoops total:/i);
  await user.clear(vanillaInput);

  await user.type(vanillaInput, "2.5");

  expect(scoopsSubtotal).toHaveTextContent('P 0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '100');
  expect(scoopsSubtotal).toHaveTextContent('P 0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(scoopsSubtotal).toHaveTextContent('P 0.00');
  

});

