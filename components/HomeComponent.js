import React, { Component } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { Card } from "react-native-elements";

import Loading from "./LoadingComponent";

import { baseUrl } from "./../shared/baseUrl";
import { connect } from "react-redux";

function RenderItem({item, isLoading, errMess}){
    if(isLoading){
        return <Loading />;
    }

    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }
    
    if(item){
        return(
            <Card
                featuredTitle={item.name}
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

    constructor(props){
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        }
    }



    animate(){
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1000
            }
        ).start()
    }

    componentDidMount(){
        this.animate();
    }

    static navigationOptions = {
        title: "Home"
    }

    render(){
        const { campsites, promotions, partners } = this.props;
        return (
            <Animated.ScrollView style={{ transform: [{scale: this.state.scaleValue}] }} >
                <RenderItem 
                    item={campsites.campsites.filter(camp => camp.featured)[0]} 
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem 
                    item={promotions.promotions.filter(promotion => promotion.featured)[0]} 
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem 
                    item={partners.partners.filter(partner => partner.featured)[0]} 
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);
