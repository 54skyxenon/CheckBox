// ProfileTabs.js

import React from 'react';
import { StyleSheet, Platform, Image, ScrollView, SafeAreaView, Text, View, Button } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'

export class FirstTab extends React.Component
{
    render()
    {
        return (
            <View>
            	<Text>First Tab</Text>
            </View>
        );
    }
}

export class SecondTab extends React.Component
{
    render()
    {
        return (
            <View>
                <Text>Second Tab</Text>
            </View>
        );
    }
}

const ProfileTabNavigation = createMaterialTopTabNavigator(
	{
		'Tasks': FirstTab,
		'Friends': SecondTab
	},
	{
		initialRouteName: 'Tasks',
		tabBarPosition: 'top',
		swipeEnabled: true,
		animationEnabled: true,
		tabBarOptions:
		{
		  activeTintColor: '#FFFFFF',
		  inactiveTintColor: '#F8F8F8',
		  style: {
			backgroundColor: '#2459ad',
		  },
		  labelStyle: {
			textAlign: 'center',
		  },
		  indicatorStyle: {
			borderBottomColor: '#FFFFFF',
			borderBottomWidth: 2,
		  },
		}
  	}
);

export default createAppContainer(ProfileTabNavigation);
