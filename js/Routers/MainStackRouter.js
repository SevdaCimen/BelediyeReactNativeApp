import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import SplashScreen from "../components/splashScreen";
import Page1 from "../components/home";
import NewsDetail from "../components/newsDetail";

import HomeDrawerRouter from "./HomeDrawerRouter";

HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});

export default (StackNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Page1: { screen: Page1 },
  NewsDetail: { screen: NewsDetail },
}));

import { openDrawer } from "../../actions/drawer";

import { DrawerNavigator, NavigationActions } from "react-navigation";

import DrawBar from "../DrawBar";


const DrawNav = DrawerNavigator(
  {
    Home:{screen:Home}
  },
  {
    contentComponent: props => <DrawBar />
  }
);