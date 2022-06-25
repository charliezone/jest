import axios from "axios";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { PRICE_SCOOPS, PRICE_TOPPINGS } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();
  const [OrderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (err) {
        setError(err);
      }
    })();
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{optionType === "scoops" ? PRICE_SCOOPS : PRICE_TOPPINGS} each</p>
      <p>
        {title} total: {OrderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map((item) => (
          <ItemComponent
            key={item.name}
            name={item.name}
            path={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }
          />
        ))}
      </Row>
    </>
  );
}
