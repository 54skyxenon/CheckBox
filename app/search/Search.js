// Search.js

import React from 'react';
import { StyleSheet, SafeAreaView, Platform, Image, Text, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {searchContent: ''};
		this.updateSearch = this.updateSearch.bind(this);
	}

  	updateSearch = searchContent => {
    	this.setState({ searchContent });
  	};

  render()
  {
    const { searchContent } = this.state;

    return (
    	<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
  			<SearchBar
				lightTheme={true}
				placeholder="Search for users..."
				containerStyle={{backgroundColor: 'white', padding: 0}}
				onChangeText={this.updateSearch}
				value={searchContent}
			  />
		</SafeAreaView>
    );
  }
}
