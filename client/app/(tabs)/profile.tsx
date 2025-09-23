import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { getProfilePicture } from '@/services/imageService'

const Profile = () => {
  return (

    <>

    <Header />
    <ScreenWrapper>
      <View style={styles.container}>
        <Image 
        source={getProfilePicture(null)}
        style={{width: 100, height: 100, borderRadius: 50}}
        />
      </View>
    </ScreenWrapper>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})