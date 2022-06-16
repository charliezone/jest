import { render, screen } from "@testing-library/react";
import Options from "../options";

test("display image foreach scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual(["Chocalate scoop", "Vanilla scoop"]);
});

test("display image foreach tooping option from the server", async () => {
  render(<Options optionType="toopings" />);

  const scoopImages = await screen.findAllByRole("img", { name: /tooping$/i });
  expect(scoopImages).toHaveLength(3);

  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual([
    "Cherries tooping",
    "M&Ms tooping",
    "Hot fudge tooping",
  ]);
});
