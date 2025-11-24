import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Bounty } from '../types/bounty'

type BountyContextValue = {
  data: Bounty
  update: (patch: Partial<Bounty>) => void
  reset: () => void
}

const defaultBounty: Bounty = {
  title: '',
  description: '',
  projectTitle: '',
  type: '',
  dominant_core: '',
  mode: 'digital',
  location: '',
  reward: { currency: 'USD', amount: 0, winners: 1 },
  rewards: [],
  timeline: { expiration_date: '', estimated_completion: { days: 0, hours: 0, minutes: 0 } },
  hasImpactCertificate: false,
  impactBriefMessage: '',
  sdgs: [],
  has_backer: false,
  backer: { name: '', logo: '', message: '' },
  terms_accepted: false,
  currency: 'USD',
  contactEmail: '',
}

const BountyContext = createContext<BountyContextValue | undefined>(undefined)

export const BountyProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Bounty>(() => defaultBounty)

  const update = (patch: Partial<Bounty>) =>
    setData((prev) => ({ ...(prev as Bounty), ...patch }))

  const reset = () => setData(defaultBounty)

  return (
    <BountyContext.Provider value={{ data, update, reset }}>
      {children}
    </BountyContext.Provider>
  )
}

export const useBounty = () => {
  const ctx = useContext(BountyContext)
  if (!ctx) throw new Error('useBounty must be used inside BountyProvider')
  return ctx
}
