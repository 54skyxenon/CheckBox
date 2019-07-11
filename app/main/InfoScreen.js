// InfoScreen.js

import React from 'react';
import { StyleSheet, Switch, ScrollView, TextInput, Text, View, Button } from 'react-native';

export default class InfoScreen extends React.Component
{
	render()
	{
		const { navigation } = this.props;
		const title = navigation.getParam('title');
		const description = navigation.getParam('description');
	
		return (<ScrollView>
					<Text style={styles.container}> {title} </Text>
					<Text style={styles.container}> {description} </Text>
				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

