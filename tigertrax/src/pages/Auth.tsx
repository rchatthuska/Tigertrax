// pages/Auth.tsx
// added by noah 9-23 8PM, divied out the AuthPage, and now it lives here
import React, { useState, useEffect } from "react";
import { 
    Alert, 
    Text,
    TextInput, 
    TouchableOpacity,
    SafeAreaView,
} from "react-native";

// our styles and db
import { styles } from "../styles/styles";
import { hash, Database } from "../db/db";

/* ==========================================================
added by Noah 9-23 1:30PM, an AuthPage component to handle both login and signup modes.
set it up so it works based on prop controls:
- mode prop controls whether login UI or signup UI is on screen
- onAuthSuccess(email) is called when you log in successfully
- onSwitchMode(mode) lets you switch between login/signup (Index controls global screen state)
========================================================== */
export default function AuthPage({mode, onAuthSuccess, onSwitchMode}: {
	// these are just prop types. mode can either be "login" or "signup", same with switch mode, and onAuthSuccess takes an email string
	// we need both switch mode and mode because this doesn't control the mode state, Index does
	mode: "login" | "signup";
	onAuthSuccess: (email: string) => void;
	onSwitchMode: (mode: "login" | "signup") => void;
}) {
	// state for email and password inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	// clear fields when mode changes
	useEffect(() => {
		setEmail("");
		setPassword("");
	}, [mode]);

    // handle login press
    function handleLogin() {
		// if email provided, check hash against the one we have stored
		const hashed = hash(password);
		if (Database[email] && Database[email] === hashed) {
            Alert.alert("Login successful!");
			onAuthSuccess(email);
        } 
		
		// otherwise invalid. other checks will be needed later
		else {
            Alert.alert("Invalid email or password.");
        }
    }

    function handleSignup() {
		// make sure BOTH are provided
		if (!email || !password) {
			Alert.alert("Please provide both an email and a password.");
			return;
		}

		// make sure email isn't already in use
		if (Database[email]) {
			Alert.alert("A user with that email already exists.");
			return;
		}
		
		// write to Database (will def not do it this way in prod)
		Database[email] = hash(password);
		Alert.alert("Signup successful! Log in to get started.");

		// switch back to login mode after signup
		onSwitchMode("login");
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* main title and subtitle */}
			<Text style={styles.title}>TigerTraX</Text>
			<Text style={styles.subtitle}>
				{mode === "login" ? "Login" : "Signup"}
			</Text>

			{/* email and password inputs */}
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			{/* action button */}
			<TouchableOpacity
				style={styles.button}
				onPress={mode === "login" ? handleLogin : handleSignup}
			>
				<Text style={styles.buttonText}>
					{mode === "login" ? "Login" : "Sign up"}
				</Text>
			</TouchableOpacity>

			{/* toggle mode */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => onSwitchMode(mode === "login" ? "signup" : "login")}
			>
				<Text style={styles.buttonText}>
					{mode === "login" ? "Need an account? Sign up" : "Back to Login"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}