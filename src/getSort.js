const getSort = (sort, orderStr) => {
  const order = ['asc', 'desc'].indexOf(orderStr) < 0 ? 'asc' : orderStr

  const sorts = {
    asc: {
      price: (a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice),
      rating: (a, b) => parseFloat(a.steamRatingPercent) > parseFloat(b.steamRatingPercent),
      title: (a, b) => (a.internalName < b.internalName) ? -1 : (a.internalName > b.internalName) ? 1 : 0,
      deal: (a, b) => parseFloat(a.dealRating) - parseFloat(b.dealRating),
      date: (a, b) => parseInt(a.lastChange) - parseFloat(b.lastChange)
    },
    desc: {
      price: (a, b) => parseFloat(b.salePrice) - parseFloat(a.salePrice),
      rating: (a, b) => parseFloat(a.steamRatingPercent) < parseFloat(b.steamRatingPercent),
      title: (a, b) => (b.internalName < a.internalName) ? -1 : (b.internalName > a.internalName) ? 1 : 0,
      deal: (a, b) => parseFloat(b.dealRating) - parseFloat(a.dealRating),
      date: (a, b) => parseInt(b.lastChange) - parseInt(a.lastChange)
    }
  }
  return sorts[order][sort] || sorts[order].date
}

module.exports = getSort
