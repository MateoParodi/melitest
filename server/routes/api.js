const express = require('express');
const router = express.Router();

const axios = require('axios');
const API_SEARCH = 'https://api.mercadolibre.com/sites/MLA/search?q=';
const API_ITEM = 'https://api.mercadolibre.com/items/';

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/search/:query', (req, res) => {
  const requestedSearch = req.params['query']
  axios.get(`${API_SEARCH}` + requestedSearch)
    .then(result => {
      res.status(200).json({
        author: {
          name: 'Mateo',
          lastname: 'Parodi'
        },
        categories: result.data.filters[0].values[0].path_from_root.map(cat => cat.name),
        items: result.data.results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: {
              currency: item.installments.currency_id,
              amount: Number(item.price.toString().split('.')[0]),
              decimals: Number(item.price.toString().split('.')[1]),
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
          }
        })
      });
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/item/:id', (req, res) => {
  const itemId = req.params['id']
  axios.get(`${API_ITEM}` + itemId)
    .then(result => {
      res.status(200).json({
        author: {
          name: 'Mateo',
          lastname: 'Parodi'
        },
        item: {
            id: result.data.id,
            title: result.data.title,
            price: {
              currency: result.data.currency_id,
              amount: Number(result.data.price.toString().split('.')[0]),
              decimals: Number(result.data.price.toString().split('.')[1]),
            },
            picture: result.data.pictures[0].url,
            condition: result.data.condition,
            free_shipping: result.data.shipping.free_shipping,
            sold_quantity: result.data.sold_quantity
          }
      });
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.get('/item/:id/description', (req, res) => {
  const itemId = req.params['id']
  axios.get(`${API_ITEM}${itemId}/description`)
    .then(result => {
      res.status(200).json(result.data.plain_text);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;
