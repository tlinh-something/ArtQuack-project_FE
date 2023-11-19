function convertToCurrencyFormat(amount) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
  return formattedAmount;
}

export default convertToCurrencyFormat;
