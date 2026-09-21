import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { colors, minTextSizePx } from "@altheara/design";

/**
 * The first screen of the Altheara app.
 *
 * Deliberately minimal: it exists to prove the whole chain works — workspace
 * resolution, Metro's monorepo config, the shared tokens from
 * @altheara/design, and the three typefaces — before any product surface is
 * built on top of it. Every color here comes from a token; no hex literals.
 */
export default function Index() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Text style={styles.wordmark}>ALTHEARA.</Text>
      <Text style={styles.mark}>✦</Text>
      <Text style={styles.line}>The place where a life is kept.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.charcoal,
    paddingHorizontal: 32,
  },
  wordmark: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 34,
    letterSpacing: 6,
    color: colors.ivory,
    textAlign: "center",
  },
  mark: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: minTextSizePx,
    color: colors.wheat,
    marginTop: 20,
    marginBottom: 20,
  },
  line: {
    fontFamily: "Lora_400Regular",
    fontSize: 17,
    lineHeight: 26,
    color: colors.stone,
    textAlign: "center",
  },
});
