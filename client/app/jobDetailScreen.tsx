import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import ScreensHeader from '@/components/ScreensHeader'
import { colors, spacingX, spacingY } from '@/constants/style'
import { Image } from 'expo-image'
import { scale } from '@/utils/styling'
import { MapPinIcon } from 'phosphor-react-native'

const jobDetailScreen = () => {
    return (
        <ScreenWrapper>
            <ScreensHeader />

            <View style={{ flex: 1, padding: 20 }}>

                <ScrollView style={{ marginTop: 10, marginBottom: 80 }} showsVerticalScrollIndicator={false}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: spacingX._10 }}>
                            <Image
                                source={require('../assets/images/favicon.png')}
                                style={{ borderRadius: 10, marginRight: 10, width: 50, height: 50 }}
                                contentFit="cover"
                                transition={1000}
                            />

                            <View>
                                <Text style={{ fontSize: scale(18), fontWeight: 400 }}>Kreadevs</Text>
                                <Text style={{ fontSize: scale(12), color: colors.neutral500, }}>Posted: 5 min ago</Text>

                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacingY._5, gap: spacingX._5, }}>
                                    <MapPinIcon size={16} color={colors.neutral500} />
                                    <Text style={{ fontSize: 12, color: colors.neutral500 }}>Karachi, Pakistan</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacingY._5, gap: spacingX._5, justifyContent: 'flex-end' }}>
                                    <Text style={{ fontSize: scale(12), color: colors.neutral500 }}>Full Time</Text>
                                    <Text>-</Text>
                                    <Text style={{ fontSize: scale(12), color: colors.neutral500 }}>OnSite</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacingY._20, paddingHorizontal: spacingX._20, borderWidth: 1, borderColor: colors.primary, gap: spacingX._20, backgroundColor: colors.neutral200, borderRadius: 10, padding: spacingX._10, maxWidth: '80%' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: 600 }}>Experience</Text>
                                <Text>3-4 years</Text>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: 600 }}>Salary</Text>
                                <Text>$20k - $30k</Text>
                            </View>
                        </View>


                    </View>

                    <View>
                        <Text style={{ fontSize: scale(24), fontWeight: 600, textAlign: 'left', marginTop: spacingY._20, fontFamily: 'GeistBold' }}>Hiring Full Stack Developer</Text>
                    </View>

                    {/* About the job */}
                    <View>
                        <View style={{ marginTop: spacingY._20 }}>
                            <Text style={{ fontSize: scale(18), fontWeight: 600, fontFamily: 'GeistSemiBold' }}>
                                About The Job
                            </Text>
                            <Text style={{ fontFamily: 'GeistRegular', fontSize: scale(14), marginTop: spacingY._10, marginBottom: spacingY._10, color: colors.neutral800, lineHeight: 20 }}>
                                We are looking for a skilled Frontend Developer with experience in React Native to build and maintain high-quality mobile applications. You will work closely with our design and backend teams to deliver smooth, user-friendly, and scalable products.                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: scale(18), fontWeight: 600, fontFamily: 'GeistSemiBold' }}>
                                Requirements
                            </Text>
                            <Text style={{ fontFamily: 'GeistRegular', fontSize: scale(14), marginTop: spacingY._10, marginBottom: spacingY._10, lineHeight: 24, color: colors.neutral800, alignItems: 'flex-start' }}>
                                <Text>{"\u2023"} Proficiency in React Native and JavaScript/TypeScript </Text>{'\n'}
                                <Text>{"\u2023"} Strong knowledge of mobile UI/UX best practices </Text> {'\n'}
                                <Text >{"\u2023"} Experience with REST APIs or GraphQL integration </Text>{'\n'}
                                <Text >{"\u2023"} Familiarity with Git and version control </Text>{'\n'}
                                <Text >{"\u2023"} Good problem-solving and communication skills </Text>{'\n'}
                            </Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: scale(18), fontWeight: 600, fontFamily: 'GeistSemiBold' }}>
                                Perks & Benefits
                            </Text>
                            <Text style={{ fontFamily: 'GeistRegular', fontSize: scale(14), marginTop: spacingY._10, marginBottom: spacingY._10, lineHeight: 24, color: colors.neutral800, alignItems: 'flex-start' }}>
                                <Text>{"\u2023"} Competitive salary package </Text>{'\n'}
                                <Text>{"\u2023"} Flexible working hours (remote option available) </Text> {'\n'}
                                <Text>{"\u2023"} Health and wellness perks </Text> {'\n'}
                                <Text>{"\u2023"} Friendly and collaborative work environment </Text> {'\n'}
                                <Text >{"\u2023"} Professional growth and learning opportunities </Text>
                            </Text>
                        </View>
                    </View>

                    {/* Activity on this job */}
                    {/* <View>
                        <Text style={{ fontSize: scale(16), fontWeight: 600 }}>Activity on this job:</Text>
                        <Text>Invite Sent: 10</Text>
                    </View> */}
                </ScrollView>

                <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: colors.primary, padding: spacingX._15, borderRadius: 10, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Text style={{ color: colors.white, fontWeight: 600 }}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScreenWrapper>

    )
}

export default jobDetailScreen

const styles = StyleSheet.create({})