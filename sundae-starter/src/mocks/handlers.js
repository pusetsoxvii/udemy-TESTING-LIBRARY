import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanila.png" },
    ]);
  }),

  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }), 

  http.post("http://localhost:3030/order", () => { 
    const orderNumber = Math.floor(Math.random() * 1000000);
    
    return HttpResponse.json([
      {status: 201, orderNumber},
    ]);
  }) 
];
