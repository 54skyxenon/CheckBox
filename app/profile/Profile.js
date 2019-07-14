// Profile.js

import React from 'react';
import { StyleSheet, Platform, Image, ScrollView, SafeAreaView, Text, View, Button, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import ProfileTabs from './ProfileTabs'

import * as firebase from 'firebase';
import '@firebase/firestore';

export class Profile extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { currentName: 'Name', currentUsername: 'Username' };
	}

	componentWillMount()
	{
		const usersRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
		
    	usersRef.get().then(doc =>
		{
			if (doc.exists)
			{
				this.setState({	currentName: doc.data().first_name + ' ' + doc.data().last_name,
								currentUsername: doc.data().username });
			}
			else
			{
				alert("No such document!");
			}
		}).catch(error => {
			alert("Error getting document:", error);
		});
	}

	render()
	{
		return (<SafeAreaView style={styles.container}>
					<ScrollView>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={{width: 100, height: 100, marginBottom: 10}}
								source={require('../../assets/pfp.png')}
							/>
							<Text style={{marginBottom: 10}}> {this.state.currentName} </Text>
							<Text style={{marginBottom: 10}}> @{this.state.currentUsername} </Text>
						</View>
						<ProfileTabs />
					</ScrollView>
				</SafeAreaView>);
	}
}


// BEGIN CODE SAMPLE
class NavigationDrawerStructure extends React.Component
{
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
	
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./image/drawer.png')}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Screen1_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      headerRight: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#2459ad',
      },
      headerTintColor: '#fff',
    }),
  },
});

export class Screen2 extends React.Component
{
  render()
  {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Screen 2 </Text>
      </View>
    );
  }
}

const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerRight: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#2459ad',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigator = createDrawerNavigator({
  Screen1: {
    screen: Screen1_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Your Profile',
    },
  },
  Screen2: {
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Edit Profile',
    },
  },
  Screen3: {
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Add Friends',
    },
  },
  Screen4: {
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Settings',
    },
  }
},
{
    contentComponent:(props) => (
        <View style={{flex:1}}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <Button title="Logout" onPress={() => {alert("Log out function: will implement later...")}}/>
            </SafeAreaView>
        </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerPosition: 'right',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

export default createAppContainer(DrawerNavigator);
// END CODE SAMPLE

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
