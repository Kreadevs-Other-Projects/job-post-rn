import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { ArrowLeftIcon, HeartIcon } from 'phosphor-react-native'
import { router } from 'expo-router'
import { colors, spacingX, spacingY } from '@/constants/style'
import { scale } from '@/utils/styling'


const ScreensHeader = () => {
  return (
    <TouchableOpacity style={{ marginTop: spacingY._20, paddingHorizontal: spacingX._20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => router.back()}>
      <ArrowLeftIcon size={24} color="black" weight="bold" />
      <Text style={{fontSize: scale(16), fontFamily: 'GeistBold'}}>Job Detail</Text>
      <HeartIcon size={24} color="black" weight="bold" />
    </TouchableOpacity>
  )
}

export default ScreensHeader

const styles = StyleSheet.create({})