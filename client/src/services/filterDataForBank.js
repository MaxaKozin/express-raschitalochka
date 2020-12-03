export default function filterData(data) {
  const filteredData = data.filter(el => el.ccy !== 'BTC');
  return filteredData.map(el => ({
    ...el,
    buy: Number(el.buy).toFixed(2),
    sale: Number(el.sale).toFixed(2),
  }));
}