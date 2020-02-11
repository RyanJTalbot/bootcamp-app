import React, { Component } from "react";
import {Text, View, FlatList, ScrollView} from "react-native";
import { Card, Icon } from "react-native-elements";

import { baseUrl } from "./../shared/baseUrl";
import { connect } from "react-redux";

function RenderCampsite({campsite, favorite, markFavorite}){
    if(campsite){
        return (
            <Card 
                featuredTitle={campsite.name}
                // image={require("./images/react-lake.jpg")}
                image={{uri: baseUrl + campsite.image}}
            >
                <Text style={{margin:10}}> {campsite.description} </Text> 
                <Icon
                    name={favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => favorite ? 
                        console.log('Already set as a favorite') : markFavorite()}
                />
            </Card>

        )
    } else {
        return <View/>
    }
}


function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



const mapStateToProps = (state) => {
    return {
        campsites: state.campsites,
        comments: state.comments
    }
}


class campsiteInfo extends Component {

    state = {
        favorite: false
    }

    markFavorite = () => this.setState({favorite: true}); 
    
    static navigationOptions = {
        tilte:"Campsite Information"
    }

    render() {
        const campsiteId = this.props.navigation.getParam("campsiteId");
        const campsite = this.props.campsites.campsites.filter( camp => camp.id == campsiteId)[0];
        const comments = this.props.comments.comments.filter( comment => comment.campsiteId == campsiteId);

        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.state.favorite}
                    markFavorite={this.markFavorite}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(campsiteInfo);