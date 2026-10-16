import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { C } from '@/lib/ui';
const I = (c: string) => ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>{c}</Text>;
export default function Layout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: C.gold, tabBarInactiveTintColor: C.sub,
    tabBarStyle: { backgroundColor: C.card, borderTopColor: C.card }, headerStyle: { backgroundColor: C.bg }, headerTintColor: C.text }}>
    <Tabs.Screen name="index" options={{ title: 'Angel Numbers', tabBarIcon: I('✦') }} />
    <Tabs.Screen name="dreams" options={{ title: 'Dreams A–Z', tabBarIcon: I('☾') }} />
    <Tabs.Screen name="favourites" options={{ title: 'Favourites', tabBarIcon: I('★') }} />
  </Tabs>;
}
