import { useEffect } from "react";
import { createContext, useContext, useState, useMemo } from "react";
import { PRICE_SCOOPS, PRICE_TOPPINGS } from "../constants";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderDetails = createContext();

//GET CONTEXT ORDER DETAILS
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context)
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvaider"
    );

  return context;
}

//SUBTOTAL OF ONE OF THE TWO OPTIONS
function calculateSubtotal(optionType, optionCounts) {
  const multiplyBy = optionType === "scoops" ? PRICE_SCOOPS : PRICE_TOPPINGS;

  const values = optionCounts[optionType];
  console.log("this are the", values);
  return values.reduce((prev, current) => prev + current, 0) * multiplyBy;
}

//GRAP COMPONENTS INTO THIS PROVIDER TO HAVE ACCESS TO
//THE PROVIDER STATE
export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: [],
    toppings: [],
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toopings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toopings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCount = { ...optionCounts };
      const optionCountMap = newOptionsCount[optionType];

      optionCountMap[itemName] += newItemCount;

      setOptionCounts(newOptionsCount);
    }
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
