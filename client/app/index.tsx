import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { scale } from '@/utils/styling';
import { colors } from '@/constants/style';
import { AppContext } from '@/context/context';

const Index = () => {
  const { userId, authToken, role } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
    
  //   const timeout = setTimeout(() => {
  //     if (!userId || !role) {
  //       router.replace('/auth');
  //     } else if(role === "applicant"){
  //       router.replace('/(tabs)/home')
  //     } else if(role === "employer") {
  //       router.replace('/')
  //     }
  //     setLoading(false);
  //   }, 1500);

  //   return () => clearTimeout(timeout);
  // }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //       router.push('/employer/home')
  //   }, 1500);
  //   return () => clearTimeout(timeout);
  // }, );

  useEffect(() => {
    const timeout = setTimeout(() => {
        router.push('/(tabs)/home')
    }, 1500);
    return () => clearTimeout(timeout);
  }, );

  if (loading) {
    return (
      <ScreenWrapper style={{ backgroundColor: colors.primary }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: scale(30), fontWeight: 'bold', color: 'white' }}>
            Jobi
            <Text style={{ fontSize: scale(30), color: colors.primary, fontWeight: 'bold' }}>
              FY
            </Text>
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return null; 
};

export default Index;
