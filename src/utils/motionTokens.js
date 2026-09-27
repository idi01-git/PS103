// Central Motion Tokens for PAIMANA Interactive Maps & Components
export const MOTION_TOKENS = {
  hoverDuration: 180, // ms ease-out
  hoverEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cardSpring: { stiffness: 300, damping: 30 },
  revealStagger: 20, // ms per state (North to South stagger)
  metricSwitch: 500, // ms smooth transition
  flyDuration: 500, // ms map zoom-to-fit
  totalClickTimeout: 650, // ms (< 700ms total click-to-navigate flow)
  countTweenDuration: 350, // ms number counter tweening
  spotlightOpacity: 0.55, // dim level for non-hovered states
  hoverScale: 1.03, // transform scale on state lift
  saffronOutline: '#FF9933' // 2px saffron outline stroke on focus/hover
};

export function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
