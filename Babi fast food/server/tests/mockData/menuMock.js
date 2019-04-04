const correctMenu = {
  menu: 'Eba, Vegetable, Isiewu',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1538727231/hrksiwxoqsnbk7zob0a1.jpg',
  quantity: '100',
  price: '2500'
};

const correctMenu2 = {
  menu: 'Coca cola',
  description: 'Chilled and refreshing',
  category: 'Drinks',
  imageURL: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  quantity: '200',
  price: '250'
};

const correctMenu3 = {
  menu: 'Rice and Turkey',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '80',
  price: '2000'
};

const correctMenu4 = {
  menu: 'Cooca cola',
  description: 'Chilled and refreshing',
  category: 'local',
  imageURL: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  quantity: '80',
  price: '250'
};

const correctMenu5 = {
  menu: 'Mixed Drinks',
  description: 'Chilled and refreshing',
  category: 'local',
  imageURL: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1539063817/mfj9epgqaqbtpqdocet4.jpg',
  quantity: '200',
  price: '250'
};

const updateMenu = {
  menu: 'Rice and Turkeys',
  description: 'This meal is fantastic. You will come for more',
  category: 'Rice',
  imageURL: 'https://res.cloudinary.com/duk5ix8wp/image/upload/v1538727565/qbarjc1aex9exxtf6ekm.jpg',
  quantity: '80',
  price: '2500'
};

const undefinedMenu = {
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const unstringedMenu = {
  menu: ['rice and turkey'],
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const emptyMenu = {
  menu: '',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const invalidMenuLength = {
  menu: 'Eb',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const invalidMenuCharacter = {
  menu: 'Eba @#',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const undefinedDescription = {
  menu: 'Semovita, Vegetable, Isiewu',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const unstringedDescription = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: ['description'],
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const emptyDescription = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: '',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const invalidDescriptionLength = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wow',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const invalidDescriptionCharacter = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo @#!',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const undefinedCategory = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const unstringedCategory = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: ['category'],
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const emptyCategory = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: '',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const invalidCategory = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'drugs@#$',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '10',
  price: '2500'
};

const undefinedQuantity = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  price: '2500'
};

const unstringedQuantity = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: ['251'],
  price: '2500'
};

const emptyQuantity = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '',
  price: '2500'
};

const invalidQuantityLength = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '500000',
  price: '2500'
};

const invalidQuantity = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '0',
  price: '2500'
};

const invalidQuantityCharacter = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20a',
  price: '2500'
};

const undefinedPrice = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
};

const unstringedPrice = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
  price: ['544']
};

const emptyPrice = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
  price: ''
};

const invalidPriceLength = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
  price: '10'
};

const invalidPrice = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
  price: '000'
};

const invalidPriceCharacter = {
  menu: 'Semovita, Vegetable, Isiewu',
  description: 'wowoo great',
  category: 'local',
  imageURL: 'https://i.kinja-img.com/gawker-media/image/upload/s--yQNssSv---/c_scale,f_auto,fl_progressive,q_80,w_800/hrp50xxvosnilpawgsjr.jpg',
  quantity: '20',
  price: '100a'
};

const undefinedImageURL = {
  menu: 'Eba, Vegetable, Isiewu',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  quantity: '100',
  price: '2500'
};

const unstringedImageURL = {
  menu: 'Eba, Vegetable, Isiewu',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: ['https://800/hrp50xxvosnilpawgsjr.jpg'],
  quantity: '100',
  price: '2500'
};

const emptyImageURL = {
  menu: 'Eba, Vegetable, Isiewu',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: '',
  quantity: '100',
  price: '2500'
};

const invalidImageFormat = {
  menu: 'Eba, Vegetable, Isiewu',
  description: 'This meal is fantastic. You will come for more',
  category: 'local',
  imageURL: 'https://800/hrp50xxvosnilpawgsjr.mp4',
  quantity: '100',
  price: '2500'
};

export {
  correctMenu, undefinedMenu, emptyMenu, invalidMenuLength, invalidMenuCharacter,
  undefinedDescription, emptyDescription, invalidDescriptionLength, invalidDescriptionCharacter,
  undefinedCategory, emptyCategory, invalidCategory, undefinedQuantity, emptyQuantity,
  invalidQuantityLength, invalidQuantity, invalidQuantityCharacter, undefinedPrice, emptyPrice,
  invalidPriceLength, invalidPrice, invalidPriceCharacter, correctMenu2, correctMenu3,
  unstringedMenu, unstringedDescription, unstringedCategory, unstringedQuantity, unstringedPrice,
  updateMenu, undefinedImageURL, unstringedImageURL, emptyImageURL, invalidImageFormat,
  correctMenu4, correctMenu5
};
