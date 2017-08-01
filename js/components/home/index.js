import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import Swiper from 'react-native-swiper';

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";


class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://necmettincimen-001-site1.itempurl.com/api/tBannerLanguage')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          banners: responseJson
        })
      })

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>

            <Button
              transparent
              onPress={() => DrawerNav.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>

          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                DrawerNav.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                  })
                );
                DrawerNav.goBack();
              }}
            >
              <Icon active name="person" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            <Swiper style={styles.wrapper} height={240}
              onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
              dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
              activeDot={<View style={{ backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
              paginationStyle={{
                bottom: -23, left: null, right: 10

              }} autoplay loop>
              {
                this.state.banners.map((l,i) => (
                  <View key={i}>
                    <Image resizeMode = 'contain'  style={styles.image} source={{ uri: 'http://www.malatya.bel.tr/'+l }} />
                  </View>
                ))
              }

            </Swiper>
          </View>

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
