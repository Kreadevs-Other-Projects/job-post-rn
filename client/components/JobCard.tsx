import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, radius, spacingX } from '@/constants/style'
import { scale } from '@/utils/styling'
import { router } from 'expo-router'

const JobCard = ({ job }) => {
    
  const [expanded, setExpanded] = useState(false);

    return (
        <Pressable onPress={() => router.push('/jobDetailScreen')}>
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobLocation}>{job.location}</Text>
            {/* <Text style={styles.jobType}>{job.jobType}</Text> */}

            <View>
                <Text style={styles.jobDescripion} numberOfLines={expanded ? undefined : 2} >{job.description}</Text>
                <TouchableOpacity onPress={() => router.push('/jobDetailScreen')}>
                    <Text style={{ color: colors.primary }}>{expanded ? "View less" : "View more"}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacingX._10 }}>
                <Text>at <Text style={{ color: colors.secondary, fontWeight: 600 }}>{job.companyName}</Text></Text>
                {/* <Text style={styles.time}>{job.timePosted}</Text> */}
            </View>
        </View>
        </Pressable>
    )
}

export default JobCard

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: radius._10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: colors.primary,
        shadowColor: "#ec0cecff",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15
      },
    
      jobTitle: {
        fontSize: scale(18),
        fontWeight: 600,
        color: colors.neutral600
      },
    
      jobLocation: {
        // marginTop: spacingX._10,
        fontSize: scale(12),
        color: colors.neutral500
      },
    
      jobType: {
        fontSize: scale(12),
        color: colors.neutral500
      },
    
      jobDescripion: {
        marginTop: spacingX._10,
        fontSize: scale(14),
        color: colors.neutral700,
        // height: '31%',
        overflow: 'hidden'
      },
    
      time: {
        marginTop: spacingX._10,
        fontSize: scale(12),
        color: colors.neutral400
      }
    
})