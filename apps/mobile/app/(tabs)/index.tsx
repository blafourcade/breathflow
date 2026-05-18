import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../../src/features/breathing/presentation/screens/home-screen";

export default function HomeRoute() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: "#070A14" }}>
      <HomeScreen />
    </ScrollView>
  );
}
