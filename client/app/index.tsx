import react, { useEffect } from 'react'
import {View, Text} from 'react-native'
import { router } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import { scale } from '@/utils/styling'
import { colors } from '@/constants/style'

const index = () => {


    useEffect(() => {
        const timeout = setTimeout(() => {
            router.navigate('/auth/auth')
        }, 2000);
    }, [])


    return (
        <ScreenWrapper style={{backgroundColor: colors.primary}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: scale(30), color: colors.neutral100, fontWeight: 600}}>Welcome to Job Post App</Text>
            </View>
        </ScreenWrapper>
    )
}

export default index