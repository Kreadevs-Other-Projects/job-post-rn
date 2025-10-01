import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/style'
import { verticalScale } from '@/utils/styling'
import { BagIcon, IceCreamIcon } from 'phosphor-react-native'

const DashboardCard = () => {

  return (
    <View style={{margin: 15, borderRadius: 10}}>

      <View style={styles.container}>
        <View style={{margin: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 500}}>Total Job Posted</Text>
            <BagIcon color="#00ff51bd" size={32} weight="fill" />
        </View>
      </View>
    </View>
  )
}

export default DashboardCard

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "60%",
        backgroundColor: colors.neutral100,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 10,
        borderWidth:2,
        borderColor: colors.primary,
        marginTop: verticalScale(10)
    }
})