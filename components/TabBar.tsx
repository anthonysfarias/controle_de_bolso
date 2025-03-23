import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Agora usamos apenas MaterialCommunityIcons

// Ícones disponíveis
const icons = {
  index: "home",
  transactions: "repeat",
  plus: "plus",
  perfil: "account",  // Alterei "user" para "account", caso o nome do ícone seja diferente em MaterialCommunityIcons
  wallet: "wallet",   // Ícone correto de carteira
} as const;

// Garantir que apenas os ícones disponíveis sejam usados
type MaterialIcons = keyof typeof MaterialCommunityIcons.glyphMap;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, dark } = useTheme();

  const backgroundColor = dark ? "#18181C" : "#fff";
  const corAtiva = dark ? "#ADF534" : "#FC4145";
  const inactiveColor = dark ? "#A1A1A1" : "#626262";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title ?? route.name;

        const isFocused = state.index === index;
        const isPlus = route.name === "plus";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabItem,
              isPlus && { backgroundColor: corAtiva }, // Define background color for "plus" button
              isPlus && styles.plusButton // Apply additional styles for "plus" button
            ]}
          >
            <MaterialCommunityIcons
              name={icons[route.name as keyof typeof icons] as MaterialIcons}
              size={isPlus ? 24 : 20}
              color={isPlus ? "#fff" : isFocused ? corAtiva : inactiveColor}
            />
            {!isPlus && (
              <Text style={[styles.label, { color: isFocused ? corAtiva : colors.text }]}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#1E1E2D",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "600",
  },
});
