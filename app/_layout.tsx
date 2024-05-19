import { Stack } from "expo-router";
import RegistrationForm from "../components/forms/registrationForm";
import VotingScreen from "@/components/screens/votingScreen";

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="index"/>
    // </Stack>

    <VotingScreen />
  );
}
