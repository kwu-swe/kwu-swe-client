export const CONTEXT_OPTIONS = [
  {
    value: 'neutral',
    label: '중립적',
    description: '객관적이고 중립적인 어조',
    icon: '🤖'
  },
  {
    value: 'warm',
    label: '따뜻한',
    description: '친근하고 공감하는 어조',
    icon: '🌟'
  },
  {
    value: 'cold',
    label: '냉정한',
    description: '현실적이고 직설적인 어조',
    icon: '❄️'
  }
] as const;
