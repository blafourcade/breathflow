import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LibraryScreen from "../../src/features/library/presentation/screens/library-screen";

export default function LibraryRoute() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "#070A14" }}>
      <LibraryScreen />
    </View>
  );
}
