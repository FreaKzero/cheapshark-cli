const getSort = (sort, orderStr) => {
  const order = ['asc', 'desc'].indexOf(orderStr) < 0 ? 'asc' : orderStr

  const sorts = {
    asc: {
      price: (a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice),
      rating: (a, b) => parseFloat(a.steamRatingPercent) > parseFloat(b.steamRatingPercent),
      title: (a, b) => (a.internalName < b.internalName) ? -1 : (a.internalName > b.internalName) ? 1 : 0,
      deal: (a, b) => parseFloat(a.dealRating) - parseFloat(b.dealRating)
    },
    desc: {
      price: (a, b) => parseFloat(b.salePrice) - parseFloat(a.salePrice),
      rating: (a, b) => parseFloat(a.steamRatingPercent) < parseFloat(b.steamRatingPercent),
      title: (a, b) => (a.internalName > b.internalName) ? -1 : (a.internalName < b.internalName) ? 1 : 0,
      deal: (a, b) => parseFloat(b.dealRating) - parseFloat(a.dealRating)
    }
  }
  return sorts[order][sort] || sorts[order].deal
}

module.exports = getSort
