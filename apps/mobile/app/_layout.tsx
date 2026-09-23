import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
} from "@expo-google-fonts/playfair-display";
import { Lora_400Regular, Lora_500Medium } from "@expo-google-fonts/lora";
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from "@expo-google-fonts/source-sans-3";

import { colors } from "@altheara/design";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // The three Altheara typefaces. Web loads these through next/font; here they
  // are bundled, so nothing renders until they are ready — a fallback face
  // flashing in and out would be a worse first impression than a held splash.
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    Lora_400Regular,
    Lora_500Medium,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.charcoal },
      }}
    />
  );
}
