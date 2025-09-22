import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '@/utils/styling'
import { colors, radius } from '@/constants/style'



const Header = () => {
    return (
        <View style={styles.container}>
            <View style={{marginTop: verticalScale(50)}}>
                <Text
                style=
                {{
                    fontSize: scale(30),
                    fontWeight: 'bold'
                }}>
                Jobi
                <Text
                    style=
                    {{
                        fontSize: scale(30),
                        color: colors.primary,
                        fontWeight: 'bold'

                    }}>
                    FY
                </Text>
            </Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(100),
        paddingHorizontal: scale(20),
        backgroundColor: colors.white,
        // borderBottomEndRadius: radius._20,
        // borderBottomStartRadius: radius._20,
    },

    headerText: {}
})