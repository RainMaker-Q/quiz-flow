import { useQuiz } from '../store/QuizContext';
import { scoreRanges } from '../data/mockQuiz';

interface ResultProps {
  onReview: () => void;
  onRestart: () => void;
}

export default function Result({ onReview, onRestart }: ResultProps) {
  const { state, quizData } = useQuiz();

  if (!quizData) return null;

  const { score } = state;
  const correctCount = state.userAnswers.filter((a) => a.isCorrect).length;
  const totalQuestions = quizData.questions.length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // 根据分数获取对应的描述
  const scoreRange = scoreRanges.find((range) => score >= range.min && score <= range.max);

  return (
    <div className="flex flex-col h-full px-4 py-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* 分数显示 */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <span className="text-5xl font-bold text-white">{score}</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            满分 {quizData.totalScore} 分
          </p>
        </div>

        {/* 评价标题 */}
        {scoreRange && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{scoreRange.title}</h2>
            <p className="text-gray-600 leading-relaxed max-w-md">{scoreRange.description}</p>
          </div>
        )}

        {/* 统计信息 */}
        <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
              <p className="text-sm text-gray-600 mt-1">总题数</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-gray-600 mt-1">答对</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{accuracy}%</p>
              <p className="text-sm text-gray-600 mt-1">正确率</p>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={onReview}
          className="w-full py-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200"
        >
          查看答题详情
        </button>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-lg font-semibold text-blue-500 border-2 border-blue-500 hover:bg-blue-50 active:scale-95 transition-all duration-200"
        >
          重新答题
        </button>
      </div>
    </div>
  );
}
