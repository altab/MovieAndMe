//Component/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getImagePathFromApi } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {

    constructor(props){
        super(props)
        this._films = []

    }


    _loadFilms() {
        //console.log(getImagePathFromApi().then())
        getFilmsFromApiWithSearchedText("star").then(data => {
            this._films = data.results
            this.forceUpdate()
        });
        
    }

    render(){
        return(
            <View style={ styles.main_container}>
                <TextInput placeholder="Titre du film" style={styles.textinput} />
                <Button title='Rechercher' onPress={() => this._loadFilms()} />
                <FlatList
                    data={this._films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
        
    }
    

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 40
    },
    textinput: {
        marginLeft: 5, 
        marginRight:5, 
        height:50, 
        borderColor:'#000000', 
        borderWidth: 1, 
        paddingLeft:5
    }
})

export default Search