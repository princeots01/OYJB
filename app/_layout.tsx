import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';

// -----------------------------------------------------------------------------
// INNER LAYOUT - This consumes ThemeContext and applies theme to Navigation
// -----------------------------------------------------------------------------
function InnerLayout() {
  const { theme } = useTheme(); // light | dark

  return (
    <NavigationThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="homeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="jobdetails" options={{ headerShown: false }} />
        <Stack.Screen name="savedjobs" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} /> 
        <Stack.Screen name="buymecoffee" options={{ headerShown: false }} /> 
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

// -----------------------------------------------------------------------------
// ROOT LAYOUT - Wraps everything with ThemeProvider
// -----------------------------------------------------------------------------
export default function RootLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
