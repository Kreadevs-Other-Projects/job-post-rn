import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { scale, verticalScale } from "@/utils/styling";
import { radius, spacingY } from "@/constants/style";
import SubmittedApplicationCard from "@/components/employer/submittedApplicationCard";

interface Applicant {
  _id: string;
  name: string;
  jobTitle: string;
  date: string;
  image: string;
}

const Applications: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://192.168.100.102:5000/api/applications/getAllApplications"
      );
      const data = await res.json();

      setApplicants(data.applications || []);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScreenWrapper>
        <Text style={styles.title}>Applications Received</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <FlatList
            data={applicants}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SubmittedApplicationCard
                item={item}
                onViewDetails={() =>
                  console.log("View details for:", item.name)
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(20) }}
          />
        )}
      </ScreenWrapper>
    </View>
  );
};

export default Applications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: scale(20),
    fontWeight: "700",
    marginVertical: verticalScale(15),
    color: "#111",
    // textAlign: "center"
    margin: scale(20),
  },
});
