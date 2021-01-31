import React from "react";

export default function CTACards({ cards }) {
  console.log(cards);
  return (
    <div>
      {cards.map((card) => (
        <h1>{card.title}</h1>
      ))}
    </div>
  );
}
