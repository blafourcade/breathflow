import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DashboardScreen from "../../src/features/dashboard/presentation/screens/dashboard-screen";

export default function StatsRoute() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: "#070A14" }}>
      <DashboardScreen />
    </ScrollView>
  );
}
