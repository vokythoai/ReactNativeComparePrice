import React from 'react';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Text, List, Spinner, ListItem, Thumbnail, Body } from 'native-base';
import * as ProductsActions from '../reducers/products';

class ProductDetail extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    tabBarIcon: () => <Icon name="home" />,
  };

  componentWillMount() {
    this.props.fetchSimilarProducts();
  }

  onBuyPress(product) {
    this.props.addProductToCart(product);
    this.props.navigation.goBack();
    setTimeout(() => this.props.navigation.navigate('MyCart', { product }), 0);
  }

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { product } = params;
    return (
      <View>
        <ScrollView>
          <Image
            style={{
              height: 200,
              width: 160,
              alignSelf: 'center',
              marginTop: 20,
            }}
            source={{ uri: product.image_link }}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 30,
              fontWeight: 'bold',
            }}
          >
            ${product.price}
          </Text>
          
          
        </ScrollView>
        <ScrollView>
          {this.props.loading && <Spinner />}        
          <List>
            {this.props.similarProducts.map(p => (
              <ListItem key={p.id}>
                <Thumbnail square height={80} source={{ uri: p.image_link }} />
                <Body>
                  <TouchableOpacity onPress={() => this.onProductPress(p)}>
                    <Text>{p.product_title}</Text>
                    <Text note>${p.price}</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

ProductDetail.propTypes = {
  navigation: PropTypes.any.isRequired,
  addProductToCart: PropTypes.func.isRequired,  
  fetchSimilarProducts: PropTypes.func.isRequired,
  similarProducts: PropTypes.array.isRequired,
};

ProductDetail.navigationOptions = props => {
  const { navigation } = props;
  const { state } = navigation;
  const { params } = state;
  return {
    tabBarIcon: () => <Icon name="home" />,
    headerTitle: params.product.name,
  };
};

function mapStateToProps(state) {
  console.log(state.productsReducer.similarProducts);
  return {
    similarProducts: state.productsReducer.similarProducts,
    user: state.userReducer.user,
    loading: state.productsReducer.loading,
  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductsActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(ProductDetail);
