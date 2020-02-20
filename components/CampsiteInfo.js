import React, { Component } from "react";
import {Text, View, FlatList, ScrollView} from "react-native";
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { Modal, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { baseUrl } from "./../shared/baseUrl";
import { connect } from "react-redux";

import {postFavorite, postComment} from "../redux/ActionCreators";

function RenderCampsite({campsite, favorite, markFavorite, showModal}){
    if(campsite){
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card 
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}}
                >
                    <Text style={{margin:10}}> {campsite.description} </Text> 
                    <View style={styles.cardRow}>
                        <Icon
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => favorite ? 
                                console.log('Already set as a favorite') : markFavorite()}
                        />
                        <Icon
                            name={favorite ? 'pencil' : 'pencil'}
                            style={styles.cardItem}
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => showModal()} 
                        />
                    </View>
                </Card>
            </Animatable.View>
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
                <Rating 
                    staringValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: '5%'}}
                    read-only
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class campsiteInfo extends Component {

    state = {
        showModal: false,
        rating: 5,
        author: "",
        text: ""
    };

    markFavorite = campsiteId => this.props.postFavorite(campsiteId); 
    
    static navigationOptions = {
        tilte:"Campsite Information"
    }


    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleComment = (campsiteId) => {
        const commnet = {
            campsiteId,
            rating      : this.state.rating,
            author      : this.state.author,
            text        : this.state.text,
            date        : new Date().toISOString()
        }
        this.props.postComment(commnet);
    }

    resetForm(){
        this.setState({
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        })
    }



    render() {
        const campsiteId = this.props.navigation.getParam("campsiteId");
        const campsite = this.props.campsites.campsites.filter( camp => camp.id == campsiteId)[0];
        const comments = this.props.comments.comments.filter( comment => comment.campsiteId == campsiteId);

        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    showModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                            <View style={{margin: 10}}>
                                <Button
                                    onPress={() => {
                                        this.handleComment(campsiteId);
                                        this.resetForm();
                                    }}
                                    color='#5637DD'
                                    title='Submit'
                                />
                            </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    <Rating 
                        showRating
                        startingValue={this.state.rating}
                        imageSize={40}
                        onFinishRating={(rating)=>this.setState({rating: rating})}
                        style={{paddingVertical: 10}}
                        />
                    <Input 
                        placeholder= 'name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(name)=> this.setState({author: name})}
                        value={this.state.author}
                    />
                    <Input 
                        placeholder= 'comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={(comment)=> this.setState({text: comment})}
                        value={this.state.text}
                    />
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    }
}


const mapDispatchToProps = {
    postFavorite: campsiteId => postFavorite(campsiteId),
    postComment: comment => postComment(comment)
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        margin: 10,
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(campsiteInfo);
