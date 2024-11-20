import { StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  // Container styles
  root: {
    flex: 1,
    backgroundColor: theme.colors.bgLight,
  },
  container: {
    flex: 1,
    padding: theme.padding.medium,
    backgroundColor: theme.colors.bgLight,
  },
  // Title styles
  title2: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  // Button styles
  buttonPrimarySmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimarySmallText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonSecondarySmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondarySmallText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonPrimaryMedium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryMediumText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonSecondaryMedium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondaryMediumText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonPrimaryLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryLargeText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  buttonSecondaryLarge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondaryLargeText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  iconLarge: {
    marginRight: 12,
  },
});

export default styles;
