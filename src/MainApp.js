import React from 'react';
import { Button, View, Text } from 'react-native';
import { useSnackbar } from './shared/SnackbarContext.jsx';
import { useTheme } from './shared/ThemeProvider.jsx';  // Import our custom theme hook

export default function MainApp() {
	const { showSnackbar } = useSnackbar();
	const { toggleTheme, isDarkTheme } = useTheme();  // Now you have toggleTheme and current state



	const handleThemeSwitch = () => {
		toggleTheme();
	};

	return (
		<View>
			<View className="flex-1 items-center justify-center bg-white">
				<Text className="text-black">Hello world</Text>
			</View>
			<Text>Snackbar Demo</Text>
			<Button
				title="Show Success Snackbar"
				onPress={() => showSnackbar("This is a success message", "success")}
			/>
			<Button
				title="Show Error Snackbar"
				onPress={() => showSnackbar("This is an error message", "error")}
			/>
			<Button
				title="Show Info Snackbar"
				onPress={() => showSnackbar("This is an info message", "info")}
			/>

			<Button title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Theme`} onPress={handleThemeSwitch} />
			<View className="bg-white dark:bg-black p-4">
				<Text className="text-black dark:text-white">
					Hello Dark Mode!
				</Text>
			</View>

		</View>
	);
}
