import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Chebox is unchecked by default", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  expect(checkbox).not.toBeChecked();
});

test("Checking checkbox enable button", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });

  const btn = screen.getByRole("button", { name: "Confirm Order" });

  await user.click(checkbox);
  expect(btn).toBeEnabled();

  await user.click(checkbox);
  expect(btn).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions);

  const overlay = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(overlay).not.toBeInTheDocument();
});
