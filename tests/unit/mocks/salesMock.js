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

const invalidSaleList = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 777,
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

const allSalesFromDB = [
  {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  },
  {
    sale_id: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2
  },
  {
    sale_id: 2,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 1,
    quantity: 1
  }
];

const saleListByIdFromDB = [
  {
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

module.exports = {
  validSaleList,
  invalidSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse,
  allSalesFromDB,
  saleListByIdFromDB,
}
