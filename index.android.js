/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, {Component} from 'react';
 import ReactNative from 'react-native';
 import * as firebase from 'firebase';
 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const styles = require('./styles.js');

// import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

// import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDZmy5uwUUe2HjwjG8THBUDWmO3dYW3NXE",
  authDomain: "clinical-guidelines-v01.firebaseapp.com",
  databaseURL: "https://clinical-guidelines-v01.firebaseio.com",
  projectId: "clinical-guidelines-v01",
  storageBucket: "clinical-guidelines-v01.appspot.com",
  messagingSenderId: "580769026128"
};

const firebaseApp = firebase.initializeApp(config);

class GuidelinesApp extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref().child('guidelines');
    const dataSource = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1.uid !== r2.uid
     });
    this.state = {
      dataSource
    };
  }

  listenForItems(itemsRef) {
    console.log("listening");
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        // console.log(child.val())
        items.push({
          title: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });


    });
  }

  componentDidMount() {
      this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
      return (
        <ListItem item={item} />
      );
    }

    render() {
      console.log(this.state.dataSource);
      console.log("rendering");
      return (
        <View style={styles.container}>

          <StatusBar title="Clinical Guidelines" />

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            style={styles.listview}
            enableEmptySections={true}
          />

          <ActionButton title="Add" />

        </View>
      );
    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('mobile1', () => GuidelinesApp);
