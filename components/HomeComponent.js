import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";

import { baseUrl } from "./../shared/baseUrl";
import { connect } from "react-redux";

function RenderItem({item}){
    if(item){
        return(
            <Card
                featuredTitle={item.name}
                // image={require("./images/react-lake.jpg")}>
                image={{uri: baseUrl + item.image}}>
                
                <Text style={{margin: 10}} >
                    {item.description}
                </Text>
            </Card>
        );
    }

    return <View/>
}


const mapStateToProps = (state) => {
    return {
        campsites   : state.campsites,
        promotions  : state.promotions,
        partners    : state.partners
    };
}


class Home extends Component {

    static navigationOptions = {
        title: "Home"
    }

    render(){
        const { campsites, promotions, partners } = this.props;
        return (
            <ScrollView>
                <RenderItem item={campsites.campsites.filter(camp => camp.featured)[0]} />
                <RenderItem item={promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem item={partners.partners.filter(partner => partner.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);