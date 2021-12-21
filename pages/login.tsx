import { Alert, AlertIcon, Box, Button, chakra, FormControl, Input, Text } from "@chakra-ui/react";
import CenterContainer from "@components/CenterContainer";
import useUser from "@util/useUser";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Login() {
	const { login, currentUser } = useUser();
	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (currentUser) {
			window.location.href = "/";
		}
	}, [currentUser]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
		} catch (err) {
			setError(err.message.replace("Firebase: ", ""));
		}

		setLoading(false);
	};

	return (
		<CenterContainer>
			<Box
				w="sm"
				px="6"
				py="8"
				borderRadius="md"
				boxShadow="4.1px 4.1px 6.5px -1.7px rgba(0,0,0,0.2)"
			>
				<Text as="h2" fontSize="2xl" align="center" mb="8">
					👋 Login
				</Text>
				{error && (
					<Alert status="error" fontSize="md">
						<AlertIcon />
						{error}
					</Alert>
				)}
				<Box as="form" onSubmit={handleSubmit}>
					<FormControl id="email" my="3">
						<Input
							variant="outline"
							placeholder="Enter your email"
							type="email"
							ref={emailRef}
							required
						/>
					</FormControl>
					<FormControl id="password" mb="3">
						<Input
							variant="outline"
							type="password"
							placeholder="Password"
							ref={passwordRef}
							required
						/>
					</FormControl>
					<Button
						mb="3"
						colorScheme="green"
						variant="solid"
						isLoading={loading}
						w="full"
						type="submit"
					>
						Login
					</Button>
					<Text as="p" fontSize="xs">
						Don't have an account?{" "}
						<Link href="/signup">
							<chakra.span textDecor="underline" cursor="pointer">Sign Up</chakra.span>
						</Link>
					</Text>
				</Box>
			</Box>
		</CenterContainer>
	);
}
