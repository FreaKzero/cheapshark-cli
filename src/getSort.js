getSort = (sort, orderStr) => {
  const order = ['asc', 'desc'].indexOf(orderStr) < 0 ? 'desc' : orderStr;

  const sorts = {
    asc: {
      price: (a,b) => a.salePrice - b.salePrice,
      rating: (a,b) => a.steamRatingPercent > b.steamRatingPercent,
      title: (a,b) => (a.internalName < b.internalName) ? -1 : (a.internalName > b.internalName) ? 1 : 0
    },
    desc: {
      price: (a,b) => b.salePrice - a.salePrice,
      rating: (a,b) => a.steamRatingPercent < b.steamRatingPercent,
      title: (a,b) => (a.internalName > b.internalName) ? -1 : (a.internalName < b.internalName) ? 1 : 0
    }
  };
  console.log(order, sort);
  return sorts[order][sort] || sorts[order].price;
};

module.exports = getSort