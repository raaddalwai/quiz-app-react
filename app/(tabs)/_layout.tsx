import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Home", headerShown: false, 
        tabBarActiveTintColor: '#11655dff',
        tabBarInactiveTintColor: '#11655dff',
        tabBarInactiveBackgroundColor: '#f7fafaff',
        tabBarIcon: () => <Ionicons name="home-outline" size={24} color="#11655dff" />

      }} />
      <Tabs.Screen name="account" options={{title: "Account", headerShown: false, 
        tabBarActiveTintColor: '#11655dff',
        tabBarInactiveTintColor: '#11655dff',
        tabBarInactiveBackgroundColor: '#f7fafaff',
        tabBarIcon: () => <Ionicons name="person-outline" size={24} color="#11655dff" />
      }} />
    </Tabs>
  )
}
