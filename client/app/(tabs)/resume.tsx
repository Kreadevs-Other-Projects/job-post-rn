import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import { colors } from '@/constants/style';

const Resume = () => {


  const [file, setfile] = useState(null)

  return (
    <>

      <Header />
      <ScreenWrapper>
        <View style={styles.container}>


          <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
            <Text style={styles.text}>Upload your resume</Text>
          </View>

          <View style={{ marginTop: 20, width: '90%', gap: 10, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: 20, borderWidth: 1, borderColor: colors.neutral400, borderRadius: 10 }}>
            <TouchableOpacity onPress={() => console.log('Upload Resume')}>
              <Text>Choose a file (pdf)</Text>
            </TouchableOpacity>
            <Button title='Upload' onPress={() => console.log('Upload')} color={colors.primary} />
          </View>

          <View style={{alignItems: 'center',}}>
            {file ? (
              <View>
                {/* <Text>{file.name}</Text> */}
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text >
                  No file to display
                </Text>
              </View>
            )
            }
          </View>
        </View>
      </ScreenWrapper>
    </>
  )
}

export default Resume

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '600',
  }
})