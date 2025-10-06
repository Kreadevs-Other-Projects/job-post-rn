import { colors } from "@/constants/style";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Easing,
} from "react-native";

const placeholder = require("../assets/images/icon.png");
const entranceImage = require("../assets/images/entrance.jpg");

const EntranceScreen = () => {
    const [failed, setFailed] = useState(false);
    const [selectedRole, setSelectedRole] = useState("applicant");

    const sliderAnim = useRef(new Animated.Value(0)).current;
    const overlayAnim = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        Animated.timing(sliderAnim, {
            toValue: selectedRole === "applicant" ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [selectedRole]);

    useEffect(() => {
        overlayAnim.setValue(600);
        Animated.timing(overlayAnim, {
            toValue: 0,
            delay: 1000,
            duration: 1000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    }, []);

    const left = sliderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["2%", "51%"],
    });

    const taglines = {
        applicant: ["Find your dream job", "Apply. Work. Grow."],
        employer: ["Hire faster, smarter", "Build your winning team."],
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={failed ? placeholder : entranceImage}
                style={styles.background}
                resizeMode="cover"
                onError={() => setFailed(true)}
            >
                <View style={styles.imageOverlay} />

                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            transform: [{ translateY: overlayAnim }],
                        },
                    ]}
                >
                    <View style={styles.textContainer}>
                        {taglines[selectedRole].map((line, index) => (
                            <Text key={index} style={styles.tagline}>
                                {line}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.toggleContainer}>
                        <Animated.View style={[styles.slider, { left }]} />
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setSelectedRole("applicant")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    selectedRole === "applicant" && styles.activeText,
                                ]}
                            >
                                Applicant
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setSelectedRole("employer")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    selectedRole === "employer" && styles.activeText,
                                ]}
                            >
                                Employer
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => router.push(`/auth?role=${selectedRole}`)}
                    >
                        <Text style={styles.continueText}>
                            Continue as{" "}
                            {selectedRole === "applicant" ? "Applicant" : "Employer"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.loginText}>Login to continue</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ImageBackground>
        </View>
    );
};

export default EntranceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    overlay: {
        width: "100%",
        height: "45%",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        alignItems: "center",
        paddingVertical: 35,
    },
    textContainer: {
        marginBottom: 30,
        alignItems: "center",
    },
    tagline: {
        color: "#222",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 5,
    },
    toggleContainer: {
        flexDirection: "row",
        width: "85%",
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 30,
        padding: 4,
        position: "relative",
        overflow: "hidden",
    },
    slider: {
        position: "absolute",
        top: 8,
        width: "47%",
        height: "85%",
        backgroundColor: colors.primary,
        borderRadius: 25,
    },
    toggleButton: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    toggleText: {
        color: "#555",
        fontSize: 16,
        fontWeight: "600",
    },
    activeText: {
        color: "#fff",
    },
    continueBtn: {
        marginTop: 35,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
    },
    continueText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    loginText: {
        color: "#333",
        fontSize: 14,
        marginTop: 18,
    },
});
