import { View, RefreshControl, ActivityIndicator, Button, TouchableWithoutFeedback, Text } from 'react-native';
import { ButtonGroup, GlobView, LoaderView, ScrollViewStyle, } from './Style/PostStyle';
import { useCallback, useEffect, useState } from 'react';
import { Post } from './Post.js';
import axios from 'axios';
import { memo } from 'react';
import { useMemo } from 'react';

export const Posts = memo(function Posts({ navigation }) {

    const [posts, setPosts] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const q = {
        id: 2
    }

    const getPosts = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(({ data }) => {
                setPosts(data)
                setTimeout(() => {
                    setLoad(true)
                }, 2000);
            })
            .catch(function (error) {
                if (error.response) {
                    setError(error.message);
                } else {
                    setError(error.message);
                }

            })
    }


    const loadScene = (post) => {
        navigation.navigate('Post', {
            post: post
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const sortByDate = () => {
        setPosts(prevState => {
            let posts = [...prevState]
            let res = posts.sort((a, b) => b.id - a.id)
            return res
        })
    }

    const sortByNew = () => {
        setPosts(prevState => {
            let posts = [...prevState]
            let res = posts.sort((a, b) => a.id - b.id)
            return res
        })
    }

    const sortByLength = () => {
        setPosts(prevState => {
            let posts = [...prevState]
            let res = posts.sort((a, b) => a.body.length - b.body.length)
            return res
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPosts()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    if (load === true && error !== true) {
        return (
            <GlobView>
                <ButtonGroup>
                    <Button title='Sort by Old' onPress={sortByDate} />
                    <Button title='Sort by New' onPress={sortByNew} />
                    <Button title='Sort by length' onPress={sortByLength} />
                </ButtonGroup>
                <ScrollViewStyle refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}>
                    {posts.length > 1 && posts.map((post, i) => {
                        return (
                            <TouchableWithoutFeedback key={post.id} onPress={() => loadScene(post)}>
                                <View>
                                    <Post post={post} />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollViewStyle>
            </GlobView>
        )
    } if (load !== true && !error) {
        return (
            <LoaderView>
                <ActivityIndicator size='large' />
            </LoaderView>
        )
    } if (error) {
        return (
            <LoaderView>
                <Text>{error}</Text>
                <Button title='Refresh?' onPress={getPosts} />
            </LoaderView>
        )
    }
})
