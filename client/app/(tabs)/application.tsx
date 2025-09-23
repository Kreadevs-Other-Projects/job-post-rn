import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'

const Application = () => {
  return (

    <>
    <Header />
    
     <ScreenWrapper>
      <View style={styles.container}>
        <Text style ={{fontSize: 30}}>
          Application
        </Text>
      </View>
    </ScreenWrapper>
    </>
  )
}

export default Application

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})