import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Tile } from "react-native-elements";

import Loading from "./LoadingComponent";

import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";


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
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate("CampsiteInfo", {campsiteId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
                />
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