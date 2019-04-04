const successfulOrder = {
  orderItems: [
    {
      menuId: 1,
      quantity: 5
    },
    {
      menuId: 2,
      quantity: 10
    }
  ],
  location: '145 herbert macaulay way'
};

const successfulOrder2 = {
  orderItems: [
    {
      menuId: 1,
      quantity: 5
    },
    {
      menuId: 2,
      quantity: 70
    }
  ],
  location: '145 herbert macaulay way'
};

const unstringedLocation = {
  orderItems: [
    {
      menuId: 1,
      quantity: 5
    }
  ],
  location: ['235 EPIC Tower']
};

const invalidLocationLength = {
  orderItems: [
    {
      menuId: 1,
      quantity: 5
    }
  ],
  location: '235'
};

const invalidLocationCharacter = {
  orderItems: [
    {
      menuId: 1,
      quantity: 5
    }
  ],
  location: '235 @ Ikorodu #'
};

const undefinedMenuId = {
  orderItems: [
    {
      quantity: 5
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const emptyMenuId = {
  orderItems: [
    {
      menuId: '',
      quantity: 5
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const invalidMenuId = {
  orderItems: [
    {
      menuId: 'he',
      quantity: 5
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const overMillionMenuId = {
  orderItems: [
    {
      menuId: 800000000000000000,
      quantity: 5
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const nonExistingMenuId = {
  orderItems: [
    {
      menuId: 50,
      quantity: 5
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const undefinedQuantity = {
  orderItems: [
    {
      menuId: 1
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const emptyQuantity = {
  orderItems: [
    {
      menuId: 1,
      quantity: ''
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const invalidQuantity = {
  orderItems: [
    {
      menuId: 1,
      quantity: -2
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const excessQuantity = {
  orderItems: [
    {
      menuId: 1,
      quantity: 2000000
    }
  ],
  location: '235, Ikorodu Road Lagos'
};

const outOfStockMenu = {
  orderItems: [
    {
      menuId: 2,
      quantity: 10
    }
  ],
  quantity: '5'
};

export {
  successfulOrder, successfulOrder2, unstringedLocation, invalidLocationLength,
  invalidLocationCharacter, undefinedMenuId, emptyMenuId, invalidMenuId, overMillionMenuId,
  nonExistingMenuId, undefinedQuantity, emptyQuantity, invalidQuantity, excessQuantity,
  outOfStockMenu
};
