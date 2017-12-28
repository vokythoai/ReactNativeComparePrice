<script src="http://localhost:8097"></script>
import React from 'react';
import { ScrollView, TouchableOpacity, TextInput, Button as LinkButton, StyleSheet, View, StatusBar  } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FooterApp from '../components/Footer'
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../components/Carousel/styles/SliderEntry.style';
import SliderEntry from '../components/Carousel/component/SliderEntry';
import styles, { colors } from '../components/Carousel/styles/index.style';
import { ENTRIES1, ENTRIES2 } from '../components/Carousel/entry/entries';
import {
  Spinner,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Body,
  Text,
  Button,
  Container,
  Header,
  Item,
  Input,
  Content,
  H2,
  H3,
} from 'native-base';
import * as ProductActions from '../reducers/products';

const SLIDER_1_FIRST_ITEM = 1;

class ProductList extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'blue',
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

  constructor (props) {
    super(props);
    this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        slider1Ref: null
    };
  }

  _renderItem ({item, index}) {
      return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
          />
      );
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
  }

    get example1 () {
      const { slider1ActiveSlide, slider1Ref } = this.state;

      return (
          <View style={styles.exampleContainer}>
              <Carousel
                ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                data={ENTRIES1}
                renderItem={this._renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                enableMomentum={false}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
              />

          </View>
      );
    }

    get gradient () {
      return (
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
      );
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input onBlur={() => this.onSearch()} onChangeText={search_text => this.setState({ search_text })} placeholder="Search product you want to buy" />
            <Icon name="ios-desktop-outline" />
          </Item>
        </Header>
        <View style={styles.container}>
          <View
            style={styles.scrollview}
            contentContainerStyle={styles.scrollviewContentContainer}
            indicatorStyle={'white'}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
              { this.example1 }
          </View>
        </View>
        <Container>
          <ScrollView>
              {this.props.loading && <Spinner color='red' />}
              <Content>
                <List>
                  {this.props.products.map(p => (
                  <ListItem style={stylesProductList.listView} key={p.id}>
                    <Thumbnail style={stylesProductList.thumbNail} square source={{ uri: p.image_link }} resizeMode="contain" />
                      <Body>
                        <TouchableOpacity onPress={() => this.onProductPress(p)}>
                          <Content>
                            <H2 style={stylesProductList.text, stylesProductList.productName}>{p.product_title}</H2>
                            <H3 style={stylesProductList.text, stylesProductList.price} note>Giá: {p.price}₫</H3>
                            <H3 style={stylesProductList.text, stylesProductList.otherInfo} note>Shop: {p.page_source}</H3>
                            <H3 style={stylesProductList.text, stylesProductList.otherInfo} note>Nhấn vào để xem chi tiết</H3>
                          </Content>
                        </TouchableOpacity>
                      </Body>
                  </ListItem>
                  ))}
                </List>
              </Content>
          </ScrollView>
        </Container>
      </Container>

    );
  }
}

const stylesProductList = StyleSheet.create({
  listView: {
    marginLeft: 0
  },
  thumbNail: {
    width: 80,
    height:80,
    marginRight: 30
  },
  text: {
    marginBottom: 5
  },
  contentInfo: {
    marginRight: 20
  },
  price: {
    color: "#c10017",
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold"
  },
  otherInfo: {
    color: "#333",
    marginLeft: 10,
    fontSize: 12,
  },
  productName: {
    fontSize: 16
  }
})

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
