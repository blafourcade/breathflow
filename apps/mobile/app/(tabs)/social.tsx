import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocialScreen from "../../src/features/social/presentation/screens/social-screen";

export default function SocialRoute() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: "#070A14" }}>
      <SocialScreen />
    </ScrollView>
  );
}
