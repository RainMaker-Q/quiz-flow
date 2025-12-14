import { useQuiz } from '../store/QuizContext';

interface ReviewProps {
  onBack: () => void;
}

export default function Review({ onBack }: ReviewProps) {
  const { state, quizData } = useQuiz();

  if (!quizData) return null;

  return (
    <div className="flex flex-col h-full">
      {/* 头部 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">答题详情</h2>
          <button
            onClick={onBack}
            className="text-blue-500 font-semibold hover:text-blue-600"
          >
            返回结果
          </button>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6 pb-6">
          {quizData.questions.map((question, index) => {
            const userAnswer = state.userAnswers.find((a) => a.questionId === question.id);
            const isCorrect = userAnswer?.isCorrect ?? false;

            return (
              <div
                key={question.id}
                className={`border-2 rounded-lg p-4 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                {/* 题号和状态 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600">
                    第 {index + 1} 题
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isCorrect ? '✓ 正确' : '✗ 错误'}
                  </span>
                </div>

                {/* 题目 */}
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  {question.question}
                </h3>

                {/* 选项 */}
                <div className="space-y-2 mb-4">
                  {question.options.map((option, optionIndex) => {
                    const isUserSelected = userAnswer?.selectedOption === optionIndex;
                    const isCorrectOption = question.correctAnswer === optionIndex;

                    let optionClass = 'bg-white border-gray-200';
                    if (isCorrectOption) {
                      optionClass = 'bg-green-100 border-green-500';
                    } else if (isUserSelected && !isCorrect) {
                      optionClass = 'bg-red-100 border-red-500';
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border-2 ${optionClass}`}
                      >
                        <div className="flex items-center">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-xs font-semibold">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="flex-1 text-sm">{option}</span>
                          {isCorrectOption && (
                            <span className="ml-2 text-green-600 text-xs font-semibold">
                              正确答案
                            </span>
                          )}
                          {isUserSelected && !isCorrect && (
                            <span className="ml-2 text-red-600 text-xs font-semibold">
                              你的答案
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 解释 */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="text-xs font-semibold text-blue-800 mb-1">答案解析</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
