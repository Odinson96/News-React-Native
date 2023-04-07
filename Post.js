import React from 'react'
import { View } from 'react-native'
import { DateStyle, PostImage, PostStyle, TitleStyle } from './Style/PostStyle'

export const Post = ({ post }) => {
    return (
        <View>
            <PostStyle>
                <View>
                    <PostImage source={require('./assets/1.png')} />
                    <DateStyle>{post.id}</DateStyle>
                </View>
                <TitleStyle>
                    {post.body}
                </TitleStyle>
            </PostStyle>
        </View>
    )
}
