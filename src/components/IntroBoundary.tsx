'use client'

import { Component, type ReactNode } from 'react'
import { InvitationCard } from '@/components/intro/InvitationCard'

interface Props {
  children: ReactNode
  onComplete: () => void
}
interface State {
  failed: boolean
}

/**
 * If the animated intro throws for any reason, fall back to a static,
 * non-animated invitation card so the guest always sees the invitation.
 */
export class IntroBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-10"
          style={{ background: 'radial-gradient(120% 120% at 50% 20%, #8A2846, #4E0F24)' }}
        >
          <InvitationCard onEnter={this.props.onComplete} reduced />
        </div>
      )
    }
    return this.props.children
  }
}
