import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import colors from "@/constants/colors";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Inter: require("../assets/fonts/Inter.ttf"),
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
	const { colorScheme } = useColorScheme();

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						contentStyle:
							Platform.OS === "web"
								? {
										backgroundColor:
											"radial-gradient(50% 50% at 50% 50%, #060308 0%, #020103 100%)",
								  }
								: {
										backgroundColor: `rgb(${colors.dark.background[100]})`,
								  },
					}}
				>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="modal"
						options={{ presentation: "modal" }}
					/>
				</Stack>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
