/**
 * 单个题目的数据结构
 */
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 正确答案的索引 (0-3)
  explanation: string; // 答案解释
}

/**
 * 完整题库的数据结构
 */
export interface QuizData {
  title: string;
  questions: Question[];
  totalScore: number; // 总分
}

/**
 * 用户对单个题目的答案
 */
export interface UserAnswer {
  questionId: string;
  selectedOption: number; // 用户选择的选项索引
  isCorrect: boolean; // 是否正确
}

/**
 * 答题状态
 */
export interface QuizState {
  currentQuestionIndex: number; // 当前题目索引
  userAnswers: UserAnswer[]; // 用户答案列表
  isCompleted: boolean; // 是否已完成答题
  score: number; // 得分
}

/**
 * 分数区间及对应的描述文案
 */
export interface ScoreRange {
  min: number;
  max: number;
  title: string;
  description: string;
}

/**
 * 应用页面状态
 */
export type PageState = 'quiz' | 'result' | 'review';
