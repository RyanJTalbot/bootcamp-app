import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";


const mapStateToPorps = (state) => {
    return {
        campsites: state.campsites
    }
}



class Directory extends Component{

    static navigationOptions = {
        title: "Directory"
    }

    render(){
        const { navigate } = this.props.navigation;

        if (this.props.campsites.isLoading) {
            return <Loading />;
        }

        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
               </View>
            );
        }

        const renderDirectoryItem = ({item}) => {
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate("CampsiteInfo", {campsiteId: item.id})}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };

        return (
            <FlatList 
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToPorps)(Directory);
