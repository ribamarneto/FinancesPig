import { Appbar, Provider, DefaultTheme, IconButton, Menu, Button } from 'react-native-paper';
import UserAccountMenu from './UserAccountMenu';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

export default function MyAppBar() {
    const [menuVisible, setMenuVisible] = React.useState(false);

    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <Provider  >
            <View style={{paddingBottom: 0, paddingVertical: 0, marginBottom: 0}}>
            <Appbar.Header>
                <Appbar.Content title="Finances Pig" titleStyle={{ fontSize: 23, fontWeight: "bold" }} />
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="account-circle" onPress={openMenu}  />}
                >
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </Appbar.Header>
            </View>
        </Provider>
    );
}