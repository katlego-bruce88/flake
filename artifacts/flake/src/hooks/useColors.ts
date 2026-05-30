import { colors } from "@/src/constants/colors";

export function useColors() {
  return { ...colors.light, radius: colors.radius };
}