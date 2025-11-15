import { Stack, useRouter } from "expo-router";

export default function RootLayout() {

    const router = useRouter();
    const Quiz = true;
  
    if (Quiz) {
      router.navigate("/quiz");
    } else {
  return (
  <Stack>
    <Stack.Screen
      name="index"
      options={{ headerShown: false }}
    />
  </Stack>
  )

}
}
