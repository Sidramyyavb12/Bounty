import { BountyFormState } from "../types/bounty";
import type { Bounty } from '../types/bounty';

export function validateStep1(b: Partial<Bounty>) {
  const errors: Record<string, string> = {}
  if (!b.title || b.title.trim().length < 5) errors.title = 'Title must be at least 5 characters'
  if (!b.description || b.description.trim().length < 10) errors.description = 'Description must be at least 10 characters'
  if (!b.type) errors.type = 'Select a bounty type'
  if (!b.dominant_core) errors.dominant_core = 'Select a dominant impact core'
  if (b.mode === 'physical' && (!b.location || b.location.trim().length === 0)) errors.location = 'Location is required for physical bounties'
  return errors
}

export function validateStep2(data: BountyFormState) {
  const errors: Record<string, string> = {};
  if (!data.reward.amount || data.reward.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }
  if (!data.reward.winners || data.reward.winners <= 0) {
    errors.winners = "At least 1 winner";
  }
  if (!data.timeline.expiration_date) {
    errors.expiration_date = "Expiration date is required";
  }
  if (data.hasImpactCertificate && !data.impactBriefMessage.trim()) {
    errors.impactBriefMessage = "Impact brief is required";
  }
  return errors;
}

export function validateStep3(b: Partial<Bounty>) {
  const errors: Record<string, string> = {}
  // basic backer validation if present
  if (b.backer) {
    if (b.backer.name && b.backer.name.length < 2) errors.backer_name = 'Backer name is too short'
  }
  return errors
}
