export const URL = 'http://45.32.120.179'

export const get = uri =>
  new Promise(resolve => {
    let response;

    switch (uri) {
      case '/products':
        response = fetch(`${URL}/api/v1/product_mobile_data/show`).then(function(response) {
                              return response.json()
                            })
        break;
      default:
        return null;
    }

    setTimeout(() => resolve(response), 1000);
    return null;
  });

export const post = (uri, data) =>
  new Promise((resolve, reject) => {
    let response;

    switch (uri) {
      case '/login':
        if (data.email === 'test@test.com' && data.password === 'test') {
          response = {
            email: 'test@test.com',
            name: 'Test Testson',
            address: '123 test street',
            postcode: '2761XZ',
            city: 'Testington',
          };
        } else {
          setTimeout(() => reject('Unauthorised'), 1000);
          return null;
        }
        break;
      case '/pay':
        if (data.card.cvc === '123') {
          response = true;
        } else {
          setTimeout(() => reject('Payment not authorised'), 1000);
          return null;
        }
        break;
      case '/register':
        response = data;
        break;
      case '/product_search':
        console.log(`${URL}/api/v1/product_mobile_data/search`);
        response = fetch(`${URL}/api/v1/product_mobile_data/search`, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                search: data.search_params,
                              })
                            }).then(function(response) {
                              return response.json()
                            })

        break;
      case '/similar_product_search':
        response = fetch(`${URL}/api/v1/product_mobile_data/similar_product`, {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                search: data.product.product_title,
                                page_source: data.product.page_source
                              })
                            }).then(function(response) {
                              return response.json()
                            })
        break;
      default:
        return null;
    }

    setTimeout(() => resolve(response), 1000);
    return null;
  });

export const put = () => {};
