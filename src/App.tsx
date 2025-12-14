import { useEffect, useState } from 'react';
import { useQuiz } from './store/QuizContext';
import {  quizDataWulin as mockQuizData  } from './data/wulin_mockQuiz';
import type { PageState } from './types/quiz';
import Question from './components/Question';
import Result from './components/Result';
import Review from './components/Review';

function App() {
  const { state, quizData, initQuiz, resetQuiz } = useQuiz();
  const [pageState, setPageState] = useState<PageState>('quiz');

  // 初始化题库数据
  useEffect(() => {
    initQuiz(mockQuizData);
  }, []);

  // 监听答题完成状态
  useEffect(() => {
    if (state.isCompleted) {
      setPageState('result');
    }
  }, [state.isCompleted]);

  const handleReview = () => {
    setPageState('review');
  };

  const handleBackToResult = () => {
    setPageState('result');
  };

  const handleRestart = () => {
    resetQuiz();
    setPageState('quiz');
  };

  if (!quizData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[state.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto min-h-screen bg-white shadow-xl">
        {/* 头部 */}
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-6">
          <h1 className="text-2xl font-bold text-center">{quizData.title}</h1>
        </header>

        {/* 主内容区域 */}
        <main className="h-[calc(100vh-88px)] overflow-hidden">
          {pageState === 'quiz' && currentQuestion && (
            <Question
              question={currentQuestion}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={quizData.questions.length}
            />
          )}

          {pageState === 'result' && (
            <Result onReview={handleReview} onRestart={handleRestart} />
          )}

          {pageState === 'review' && <Review onBack={handleBackToResult} />}
        </main>
      </div>
    </div>
  );
}

export default App;
