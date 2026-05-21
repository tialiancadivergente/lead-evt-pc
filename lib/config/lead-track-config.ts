import { getTagIdByTemperature } from "@/lib/temperature-utils";

export const LEAD_TRACK_CONFIG = {
  launch: "oro",
  season: "JUN26",
  tag_id: (temperature: string | null | undefined): string => {
    if (!temperature) {
      return "";
    }

    const tagId = getTagIdByTemperature(temperature);
    return tagId ? String(tagId) : "";
  },
} as const;
