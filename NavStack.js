import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Posts } from './Posts'
import { OnePost } from './OnePost'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Posts}
                options={{ title: 'Главная' }}
            />
            <Stack.Screen
                name='Post'
                component={OnePost}
                options={{ title: 'Новость' }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}
