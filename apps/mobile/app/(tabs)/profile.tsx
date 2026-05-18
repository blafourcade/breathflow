import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileScreen from "../../src/features/profile/presentation/screens/profile-screen";

export default function ProfileRoute() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: "#070A14" }}>
      <ProfileScreen />
    </ScrollView>
  );
}
