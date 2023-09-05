import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Routes } from "./src/routes";

// import { Loading } from "./src/components/Loading";
import { GluestackUIProvider, Text, Box, config, Spinner, } from "@gluestack-ui/react";
import { createConfig } from '@gluestack-style/react';

import { ToastProvider } from "@gluestack-ui/toast";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  // if (!fontsLoaded) {
  //   return <Spinner />;
  // }
  const customTheme = createConfig({
    aliases: {
      bg: 'backgroundColor',
      p: 'padding',
      h: 'height',
      w: 'width',
    },
    tokens: {
      colors: {
        primary: 'blue',
        secondary: 'green',
        text: 'black',
        background: 'white',
      },
      fonts: {
        body: 'Arial, sans-serif',
        heading: 'Georgia, serif',
      },
      fontSizes: {
        small: '12px',
        medium: '16px',
        large: '20px',
      },
      space: { 0: 0, 1: 4, 2: 8, 4: 16, 8: 32 },
    },

  })
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </GluestackUIProvider>
  );
}
