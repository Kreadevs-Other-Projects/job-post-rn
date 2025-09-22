import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'

const Resume = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style ={{fontSize: 30}}>
          Resume
        </Text>
      </View>
    </ScreenWrapper>
  )
}

export default Resume

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})