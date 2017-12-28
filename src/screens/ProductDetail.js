import React from 'react';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
import { Icon, Button, Text, List, Spinner, ListItem, Thumbnail, Body, Container, Content, Card, CardItem, Left, Right, Fab } from 'native-base';
import * as ProductsActions from '../reducers/products';

class ProductDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      active: true
    };
  }

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

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }



  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { product } = params;
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <View>
          <Image
            style={{
              alignSelf: 'center',
              height: 200,
              width: 200,
              borderWidth: 1
            }}
            source={{ uri: product.image_link }}
            resizeMode="contain"
          />
          <Text
            style={{
              alignSelf: 'center',
              color: "#c10017",
              marginTop: 20,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {product.product_title}
          </Text>
        </View>

        <ScrollView>
          {this.props.loading && <Spinner />}
          <List>
            {this.props.similarProducts.map(p => (
              <ListItem style={{ marginLeft: 0}} key={p.id}>
                <Thumbnail square height={80} resizeMode="contain" source={{ uri: 'https://img.websosanh.vn/v2/users/logo/images/P2g9lSmHO95H.jpg' }} />
                <Body>
                  <TouchableOpacity onPress={() => this.onProductPress(p)}>
                    <View style={{ width: 80, marginLeft: 15}}>
                      <StarRating
                      disabled={false}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={2}
                      starSize={15}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      starColor={'red'}
                    />
                    </View>
                    <Text>{p.product_title}</Text>
                    <Text note>{p.price}₫</Text>
                    <Text note>Link sản phẩm: http://sgmall.vn/san-pham/iphone-x-edition-64gb-silver-quoc-te/</Text>
                    <Text note>Nơi bán: {p.page_source}</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
            ))}
          </List>
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="ios-basket-outline" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="ios-pulse" />
            </Button>
          </Fab>
        </View>
      </Container>
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
