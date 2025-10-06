import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { colors, radius, spacingX } from "@/constants/style";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { scale } from "@/utils/styling";
import JobCard from "@/components/JobCard";
import { AppContext } from "@/context/context";
const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const { setAllJob, allJobs } = useContext(AppContext)

  const cardData = [
    {
      jobTitle: "Hiring Full Stack Developer",
      jobLocation: "On-site-Karachi, Pakistan",
      jobType: "Part-time",
      jobDescription:
        "We are seeking a talented and motivated Full Stack Developer to join our team. The ideal candidate will be responsible for designing, developing, and maintaining both front-end and back-end components of web applications. You should have strong expertise in modern JavaScript frameworks (such as React or Angular), server-side technologies (Node.js, Python, or similar), database management, and API integration.",
      companyName: "Kreadevs",
      timePosted: " 5 min ago",
    },

    {
      jobTitle: "Hiring Full Stack Developer",
      jobLocation: "On-site-Karachi, Pakistan",
      jobType: "Part-time",
      jobDescription:
        "We are seeking a talented and motivated Full Stack Developer to join our team. The ideal candidate will be responsible for designing, developing, and maintaining both front-end and back-end components of web applications. You should have strong expertise in modern JavaScript frameworks (such as React or Angular), server-side technologies (Node.js, Python, or similar), database management, and API integration.",
      companyName: "Kreadevs",
      timePosted: " 5 min ago",
    },
  ];

  // useEffect(() => {
  //   console.log("allJobs",allJobs);
    
  // }, [])

  return (
    <>
      <Header />

      <ScrollView>
        <ScreenWrapper>
          <View style={styles.container}>
            <View style={styles.SearchBar}>
              <MagnifyingGlassIcon
                size={24}
                color={colors.neutral100}
                style={styles.icon}
              />
              <TextInput
                placeholder="Search for jobs e.g. Full Stack"
                placeholderTextColor={colors.neutral400}
                style={styles.searchInput}
              ></TextInput>
            </View>

            {/* <View style={styles.cardContainer}>
              <View>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontWeight: 600,
                    color: colors.neutral600,
                  }}
                >
                  Jobs For you
                </Text>
              </View>
            </View> */}

            <View style={styles.cardContainer}>
              <View>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontWeight: 600,
                    color: colors.neutral600,
                  }}
                >
                  Recent Jobs
                </Text>
              </View>

              <FlatList
                data={allJobs}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => <JobCard job={item} />}
              />
            </View>
          </View>
        </ScreenWrapper>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },

  SearchBar: {
    alignItems: "center",
    borderRadius: radius._10,
    width: "90%",
    backgroundColor: colors.neutral100,
    flexDirection: "row",
    shadowColor: "#000",
    borderColor: colors.primary,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginHorizontal: spacingX._10,
    color: colors.neutral400,
  },

  searchInput: {
    height: 50,
    fontSize: 16,
    color: colors.neutral800,
  },

  cardContainer: {
    marginTop: 20,
    width: "90%",
    flex: 1,
  },
});
