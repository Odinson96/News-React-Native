import React from 'react'
import { Button, ScrollView, Text, View } from 'react-native'
import { ViewStyled } from './Style/OnePostStyle'
import { GlobView } from './Style/PostStyle'

export const OnePost = ({ route, navigation }) => {
    const { post } = route.params

    return (
        <GlobView>
            <ScrollView>
                <ViewStyled>
                    <Text>{post.id}</Text>
                    <Text>{post.title}</Text>
                    <Text>{post.body}</Text>
                </ViewStyled>
            </ScrollView>
        </GlobView>
    )
}
