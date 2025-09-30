import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const home = () => {
  return (
    <ScreenWrapper>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>home</Text>
      </View>
    </ScreenWrapper>
  )
}

export default home

const styles = StyleSheet.create({})