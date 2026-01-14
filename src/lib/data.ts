export type Weakness = 'communication' | 'decision-making' | 'holistic-leadership';

export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    value: Weakness;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: '當團隊成員對專案方向有疑慮時，您通常會如何處理？',
    options: [
      { text: '召開會議，詳細解釋決策背後的考量，並聽取團隊的回饋。', value: 'communication' },
      { text: '相信自己的判斷，要求團隊按照計畫執行。', value: 'decision-making' },
      { text: '尋找一個折衷方案，希望能滿足所有人。', value: 'holistic-leadership' },
    ],
  },
  {
    question: '面對一個緊急且高風險的決策，您的第一反應是什麼？',
    options: [
      { text: '快速收集關鍵資訊，果斷做出決定並承擔責任。', value: 'decision-making' },
      { text: '與核心成員討論，尋求共識後再做決定。', value: 'communication' },
      { text: '評估所有可能的選項及其影響，即使會花費更多時間。', value: 'holistic-leadership' },
    ],
  },
  {
    question: '您如何看待團隊成員的個人發展？',
    options: [
      { text: '將其視為團隊成功的基石，並投入時間指導他們。', value: 'holistic-leadership' },
      { text: '專注於當前任務，認為個人發展是員工自己的責任。', value: 'decision-making' },
      { text: '定期與他們溝通職涯目標，並提供相關資源。', value: 'communication' },
    ],
  },
  {
    question: '當團隊出現衝突時，您會如何介入？',
    options: [
      { text: '作為調解人，促進雙方對話以找到解決方案。', value: 'communication' },
      { text: '設定明確的界線，要求雙方專注於工作。', value: 'decision-making' },
      { text: '分析衝突根源，並調整團隊結構或流程以預防未來問題。', value: 'holistic-leadership' },
    ],
  },
];

export const weaknessInfo = {
  'communication': {
    title: '溝通能力 (Communication)',
    description: '您在與團隊溝通、建立共識方面可能需要加強。有效的溝通是建立信任和激勵團隊的關鍵。',
    recommendation: '建議您學習如何更清晰地傳達願景、積極傾聽團隊聲音，並提供有建設性的回饋。'
  },
  'decision-making': {
    title: '決策與責任感 (Decision-Making)',
    description: '您在果斷決策和承擔責任方面有成長空間。強而有力的決策能為團隊指明方向。',
    recommendation: '建議您練習在壓力下快速分析情勢、做出選擇，並對結果負責，從而建立領導權威。'
  },
  'holistic-leadership': {
    title: '全面領導技巧 (Holistic Leadership)',
    description: '您可能需要發展更全面的領導技巧，包括策略思維、團隊發展和願景建立。',
    recommendation: '建議您從更高的維度思考問題，不僅要完成任務，更要培養人才、建立積極的團隊文化。'
  }
}

export interface Simulation {
  id: number;
  scenario: string;
  options: string[];
}

export const simulations: Simulation[] = [
  {
    id: 1,
    scenario: '一位表現優秀的團隊成員突然提出辭職，表示他得到了更好的發展機會。您會如何回應？',
    options: [
      '表達祝福，並立即開始招聘流程。',
      '嘗試用更高的薪資或職位挽留他。',
      '與他進行深入對談，了解他離職的真正原因，並評估是否能提供他想要的成長機會。',
    ],
  },
  {
    id: 2,
    scenario: '專案進入關鍵階段，但團隊士氣低落，成員抱怨工作量過大。您會怎麼做？',
    options: [
      '強調專案的重要性，要求大家堅持下去。',
      '舉辦團隊活動或提供獎勵來激勵士氣。',
      '召集團隊會議，重新評估工作分配的合理性，並共同找出提高效率的方法。',
    ],
  },
  {
    id: 3,
    scenario: '您空降到一個新團隊，發現團隊成員對您的領導風格持懷疑態度，不太願意合作。您該如何建立信任？',
    options: [
      '立即推行新的規定，樹立權威。',
      '花時間與每位成員一對一溝通，了解他們的想法和擔憂，並展現您的專業能力。',
      '放任不管，相信時間會證明一切。',
    ],
  },
];
