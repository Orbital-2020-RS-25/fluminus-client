import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
    modalBG: {
        flex: 1, 
        alignItems: 'center', 
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF20'
    }, 
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
  }
});

const Loader = (props) => {
    const {
        loading, 
        ...attributes
    } = props;

    return (
    <Modal 
        transparent={true} 
        visible={loading}
        animationType={"none"}>
        <View style = {styles.modalBG}>
            <View style = {styles.activityIndicatorWrapper}>
                <ActivityIndicator animating={loading} />
            </View>
        </View>
    </Modal>
    )
}

export default Loader;