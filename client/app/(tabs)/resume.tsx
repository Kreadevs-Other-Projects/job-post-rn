import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { colors } from "@/constants/style";
// import * as DocumentPicker from "expo-document-picker";
import Pdf from "react-native-pdf";

type fileProps = {
  uri: string;
};

const Resume = ({ uri }: fileProps) => {
  const [file, setfile] = useState(null);

  // const pickFile = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: "*/*",
  //       copyToCacheDirectory: true,
  //     });

  //     // console.log(result.assets[0].uri);

  //     if (!result.canceled) {
  //       const { uri } = result.assets[0];

  //       // setfile();
  //     }
  //   } catch (error) {
  //     console.log("Error picking file:", error);
  //   }
  // };

  return (
    <>
      <Header />
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={{ alignSelf: "flex-start", marginLeft: 20 }}>
            <Text style={styles.text}>Upload your resume</Text>
          </View>

          <View
            style={{
              marginTop: 20,
              width: "90%",
              gap: 10,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: 20,
              borderWidth: 1,
              borderColor: colors.neutral400,
              borderRadius: 10,
            }}
          >
            {/* <TouchableOpacity onPress={pickFile}>
              <Text>Choose a file (PDF)</Text>
            </TouchableOpacity>
            <Button title="Upload" onPress={pickFile} color={colors.primary} /> */}
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              flex: 1,
              width: "100%",
            }}
          >
            {file ? (
              <View style={{ flex: 1, width: "90%", height: 500 }}>
                <Text style={{ marginBottom: 10, fontWeight: "600" }}>
                  {/* {file.name} */}
                </Text>
                {/* <Pdf
                  //   source={{ uri: file.uri }}
                  style={{ flex: 1, borderRadius: 10 }}
                  onError={(error) => console.log("PDF error:", error)}
                /> */}
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text>No file to display</Text>
              </View>
            )}
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "600",
  },
});
