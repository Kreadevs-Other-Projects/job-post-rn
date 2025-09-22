import react, { useEffect } from 'react'
import {View, Text} from 'react-native'
import { router } from 'expo-router'

const index = () => {


    useEffect(() => {
        const timeout = setTimeout(() => {
            router.navigate('/(tabs)/home')
        }, 2000);
    }, [])


    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default index