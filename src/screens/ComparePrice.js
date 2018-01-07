import React from 'react';
import { Image, ScrollView, View, TouchableOpacity, StyleSheet, Container } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'native-base';
import { Bar, SmoothLine, StockLine, Scatterplot } from 'react-native-pathjs-charts';
import { Text, Circle } from 'react-native-svg';
import * as ProductsActions from '../reducers/products';


class ComparePrice extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    tabBarIcon: () => <Icon name="home" />,
  };

  componentWillMount() {
    this.props.fetchSimilarProducts();
  }

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { product } = params;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    let data = [
      [{
        "x": 0,
        "y": product.price_to_compare + 400000
      }, {
        "x": 1,
        "y": product.price_to_compare + Math.floor(Math.random()*(400000 - 100000 +1)+100000)
      }, {
        "x": 2,
        "y": product.price_to_compare + Math.floor(Math.random()*(400000 - 100000 +1)+100000)
      }, {
        "x": 3,
        "y": product.price_to_compare + Math.floor(Math.random()*(400000 - 100000 +1)+100000)
      }, {
        "x": 4,
        "y": product.price_to_compare + Math.floor(Math.random()*(400000 - 100000 +1)+100000)
      }, {
        "x": 5,
        "y": product.price_to_compare + Math.floor(Math.random()*(400000 - 100000 +1)+100000)
      }, {
        "x": 6,
        "y": product.price_to_compare
      }]
    ]
    let options = {
      width: 250,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [
          {value: mm+6},
          {value: mm+5},
          {value: mm+4},
          {value: mm+3},
          {value: mm+2},
          {value: mm+1},
          {value: mm}
        ],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (

        <View style={styles.container}>
          <StockLine style={styles.chart} data={data} options={options} xKey='x' yKey='y' />
        </View>

    )
}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    width: "100%",
    height: "100%",
    marginTop: 30
  },
  chart: {
    width: 1000,
  }
});


ComparePrice.propTypes = {
  navigation: PropTypes.any.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  fetchSimilarProducts: PropTypes.func.isRequired,
  similarProducts: PropTypes.array.isRequired,
};

ComparePrice.navigationOptions = props => {
  const { navigation } = props;
  const { state } = navigation;
  const { params } = state;
  return {
    tabBarIcon: () => <Icon name="home" />,
    headerTitle: "Compare Price",
  };
};

function mapStateToProps(state) {
  return {

  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(ProductsActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(ComparePrice);
