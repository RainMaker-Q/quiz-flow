import { mockQuizData } from '../data/mockQuiz';
import type { QuizData } from '../types/quiz';

/**
 * 获取题库数据
 * 当前使用Mock数据，后续可以替换为真实API调用
 *
 * @returns Promise<QuizData> 题库数据
 */
export async function fetchQuizData(): Promise<QuizData> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: 后续替换为真实API调用
  // const response = await fetch('/api/quiz');
  // const data = await response.json();
  // return data;

  return mockQuizData;
}

/**
 * 提交答题结果到服务器（可选）
 *
 * @param score 得分
 * @param answers 答题记录
 */
export async function submitQuizResult(score: number, answers: any[]): Promise<void> {
  // TODO: 后续可以实现提交答题结果到服务器
  // await fetch('/api/quiz/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ score, answers })
  // });

  console.log('提交答题结果:', { score, answers });
}
