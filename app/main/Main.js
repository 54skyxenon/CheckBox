// Main.js

import React from 'react';
import { StyleSheet, SafeAreaView, Platform, Image, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Button } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import { BottomNavigation } from 'react-native-paper';
import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';
import '@firebase/firestore';

import Tasks from '../tasks/Tasks';
import Profile from '../profile/Profile';
import Search from '../search/Search';

export default class Main extends React.Component
{
	constructor(props)
  	{
  		super(props);
  		this.state = {
    		index: 0,
			routes: [
			  { key: 'activity', title: 'Main', icon: 'map' },
			  { key: 'search', title: 'Search', icon: 'search' },
			  { key: 'pending', title: 'Tasks', icon: 'check' },
			  { key: 'profile', title: 'Profile', icon: 'person' }
			]
  		};
  		this._handleIndexChange = this._handleIndexChange.bind(this);
	}

	_handleIndexChange(index)
	{
		this.setState({ index });
	}

	_renderScene = BottomNavigation.SceneMap({
		activity: Activity,
		profile: Profile,
		search: Search,
		pending: Tasks
	});

	render() {
		return (
			<BottomNavigation
				barStyle={{ backgroundColor: '#2459ad' }}
				navigationState={this.state}
				onIndexChange={this._handleIndexChange}
				renderScene={this._renderScene}
			/>
		);
	}
}

export class Activity extends React.Component
{
	constructor(props)
  	{
  		super(props);
  		this.componentDidMount = this.componentDidMount.bind(this);
  		this.componentWillMount = this.componentWillMount.bind(this);
  		this.handleLogout = this.handleLogout.bind(this);
  		this.state = { currentUser: null, currentUsername: '', errorMessage: null };
	}
	
	componentDidMount()
	{
		const { currentUser } = firebase.auth();
    	this.setState({ currentUser });
	}
	
	componentWillMount()
	{
		const usersRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
		
    	usersRef.get().then(doc =>
		{
			if (doc.exists)
			{
				this.setState({currentUsername: doc.data().username});
			}
			else
			{
				alert("No such document!");
			}
		}).catch(error => {
			alert("Error getting document:", error);
		});
	}
	
	// Log out the user
	handleLogout()
	{
		firebase.auth().signOut()
		  .then(() => {
			this.props.navigation.navigate('Login');
		  })
		  .catch(error => {
			this.setState({ errorMessage: error.message });
		  });
	}

	render()
	{
		const { currentUser } = this.state;
		
		return (
			<View style={styles.container}>
				{
					this.state.currentUsername === '' &&
					<ActivityIndicator />
				}
				{
					this.state.currentUsername !== '' &&
					<Text>
						Hi @{currentUser && this.state.currentUsername}!
					</Text>
				}
				<Button title="Logout" onPress={this.handleLogout} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  },
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  }
})
