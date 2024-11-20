import { StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.bgLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonPrimarySmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.button,
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
  },
  buttonSecondaryLargeText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
});

export default styles;
