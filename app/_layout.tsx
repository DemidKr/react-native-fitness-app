import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
            name='index'
            options={{
              // https://reactnavigation.org/docs/headers#setting-the-header-title
              title: 'My home',
              // headerBackButtonMenuEnabled: false,
              // headerBackTitleVisible: false
              // https://reactnavigation.org/docs/headers#adjusting-header-styles
              // headerStyle: { backgroundColor: '#f4511e' },
              // headerTintColor: '#fff',
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              // },
              // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
              // headerTitle: props => <LogoTitle {...props} />,
            }}
        />
        <Stack.Screen name="bmi" options={{ headerShown: true, title: "Калькулятор индекс массы тела", headerBackVisible: true, headerBackButtonMenuEnabled: true }} />
        {/*<Stack.Screen name="(dairy)" options={{ headerShown: false , title: "Калькулятор индекс массы тела"}} />*/}
      </Stack>
    </ThemeProvider>
  );
}
