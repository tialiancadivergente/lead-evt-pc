"use client";

import { useCallback } from "react";

import useUserIP from "./useUserIP";
import {
  LeadTrackingConfig,
  LeadTrackingPayload,
  sendLeadTracking,
} from "@/lib/tracking/leadTracking";

export interface UseLeadTrackingOptions extends LeadTrackingConfig {
  defaultExtraParams?: Record<string, string | null | undefined>;
}

export interface TrackLeadInput
  extends Omit<LeadTrackingPayload, "extraParams" | "ipAddress"> {
  ipAddress?: string | null;
  extraParams?: Record<string, string | null | undefined>;
}

const useLeadTracking = (options?: UseLeadTrackingOptions) => {
  const userIp = useUserIP();

  const {
    baseUrl,
    eventId,
    eventName,
    gaPropertyId,
    defaultExtraParams,
  } = options ?? {};

  const trackLead = useCallback(
    async (payload: TrackLeadInput = {}) => {
      const mergedExtra = {
        ...(defaultExtraParams ?? {}),
        ...(payload.extraParams ?? {}),
      };

      const finalPayload: LeadTrackingPayload = {
        leadEmail: payload.leadEmail,
        leadPhone: payload.leadPhone,
        ipAddress: payload.ipAddress ?? userIp,
        extraParams: mergedExtra,
      };

      return sendLeadTracking(
        { baseUrl, eventId, eventName, gaPropertyId },
        finalPayload,
      );
    },
    [baseUrl, eventId, eventName, gaPropertyId, defaultExtraParams, userIp],
  );

  return {
    userIp,
    trackLead,
  };
};

export default useLeadTracking;


