const validSaleList = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const saleListWithInvalidProductId = [
  {
    productId: 'j',
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

const saleListWithInvalidQuantity = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: -1
  }
];

const validCreationResponse = {
  id: 1,
  message: validSaleList
}

module.exports = {
  validSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse
}
