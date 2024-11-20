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
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.bgLight,
  },
  item: {
    flex: 1,
    padding: theme.spacing.small,
    backgroundColor: theme.colors.white,
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.card,
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.medium,
  },
  // Title styles
  title2: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  title3: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  // Input styles
  input: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    width: "100%",
    ...theme.shadows.button,
  },
  // Button styles
  buttonPrimarySmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
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
    borderRadius: theme.borderRadius.full,
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
    borderRadius: theme.borderRadius.full,
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
    borderRadius: theme.borderRadius.full,
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
  // Icon styles
  iconSmall: {
    marginRight: 4,
  },
  iconMedium: {
    marginRight: 8,
  },
  iconLarge: {
    marginRight: 12,
  },
  //
  divider: {
    height: 1,
    backgroundColor: theme.colors.secondary,
    marginVertical: theme.spacing.tiny,
  },
});

export default styles;
