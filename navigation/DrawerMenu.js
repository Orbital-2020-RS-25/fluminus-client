import React from 'react'
import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItems } from 'react-navigation-drawer'

const DrawerMenu = (props) => {
    return (
        <DrawerContentScrollView {...props}> 
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default DrawerMenu;