// Tasks.js

import React from 'react';
import { Modal, StyleSheet, Platform, TextInput, Text, Switch, View, ScrollView, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InfoScreen from '../main/InfoScreen';
import TaskCreate from './TaskCreate';

class TaskScreen extends React.Component
{
  render() {
	  
    return (
      <View style={styles.container}>
        <Button
			title="New Task"
			onPress={() => {this.props.navigation.navigate('Create')}}
		/>
      </View>
    );
  }
}

export const TaskStackNavigator = createStackNavigator(
  {
    Tasks: TaskScreen,
    Create: TaskCreate,
    CreateInfo: InfoScreen
  },
  {
    initialRouteName: 'Tasks',
  }
);

export default Tasks = createAppContainer(TaskStackNavigator);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36
  	}
});
