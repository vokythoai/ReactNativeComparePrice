import React from 'react';
import { ScrollView, TouchableOpacity, TextInput, Button as LinkButton, View } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Spinner,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Body,
  Text,  
} from 'native-base';
import * as ProductActions from '../reducers/products';

class ProductList extends React.Component {  
  static navigationOptions = {
    drawerLabel: 'Home',
    tabBarIcon: () => <Icon name="home" />,
  };

  state = { search_text: null };

  componentWillMount() {
    this.props.fetchProducts();
  }

  onProductPress(product) {
    this.props.navigation.navigate('ProductDetail', { product });
  }

  onSearch() {
    this.props.searchProduct(this.state.search_text);
  }

  render() {
    return (
      <View>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}          
            onChangeText={search_text => this.setState({ search_text })}/>
        <LinkButton title={'Search'} onPress={() => this.onSearch()} />
        <ScrollView>
          {this.props.loading && <Spinner />}        
          <List>
            {this.props.products.map(p => (
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

ProductList.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.any.isRequired,
  search: PropTypes.string,
  searchProduct: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    products: state.productsReducer.products || [],
    loading: state.productsReducer.loading,
  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(ProductList);
