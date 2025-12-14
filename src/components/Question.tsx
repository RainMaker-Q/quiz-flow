import { useState } from 'react';
import type { Question as QuestionType } from '../types/quiz';
import { useQuiz } from '../store/QuizContext';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
}

export default function Question({ question, questionNumber, totalQuestions }: QuestionProps) {
  const { submitAnswer, nextQuestion, finishQuiz } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    submitAnswer(question.id, selectedOption);

    if (questionNumber === totalQuestions) {
      finishQuiz();
    } else {
      nextQuestion();
      setSelectedOption(null);
    }
  };

  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {questionNumber} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* 题目 */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

        {/* 选项 */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 font-semibold
                  ${selectedOption === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'}">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 下一题按钮 */}
      <div className="mt-6">
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            selectedOption === null
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
          }`}
        >
          {isLastQuestion ? '查看结果' : '下一题'}
        </button>
      </div>
    </div>
  );
}
