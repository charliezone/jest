import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Chocalate",
          imagePath: "https://picsum.photos/id/1/200/200",
        },
        {
          name: "Vanilla",
          imagePath: "https://picsum.photos/id/2/200/200",
        },
      ])
    );
  }),
  rest.get("http://localhost:3030/toopings", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Cherries",
          imagePath: "https://picsum.photos/id/3/200/200",
        },
        {
          name: "M&Ms",
          imagePath: "https://picsum.photos/id/4/200/200",
        },
        {
          name: "Hot fudge",
          imagePath: "https://picsum.photos/id/5/200/200",
        },
      ])
    );
  }),
];
