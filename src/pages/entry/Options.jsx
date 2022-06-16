import axios from "axios";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();

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

  return (
    <Row>
      {items.map((item) => (
        <ItemComponent key={item.name} name={item.name} path={item.imagePath} />
      ))}
    </Row>
  );
}
