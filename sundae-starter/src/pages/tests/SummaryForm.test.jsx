import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SummaryForm } from "../summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("testing summary form checkbox and button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkboxElement).not.toBeChecked();

  const formButtonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(formButtonElement).toBeDisabled();

  await user.click(checkboxElement);
  expect(formButtonElement).toBeEnabled();

  await user.click(checkboxElement);
  expect(formButtonElement).toBeDisabled();
});

test("popover response to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover startout hiden
  const nullpopover = screen.queryByText(
    /no ice cream will actualy be delivered/i
  );
  expect(nullpopover).not.toBeInTheDocument();
  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actualy be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
