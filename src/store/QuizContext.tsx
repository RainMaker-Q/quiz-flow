import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { QuizState, UserAnswer, QuizData } from '../types/quiz';

interface QuizContextType {
  state: QuizState;
  quizData: QuizData | null;
  initQuiz: (data: QuizData) => void;
  submitAnswer: (questionId: string, selectedOption: number) => void;
  nextQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

type QuizAction =
  | { type: 'INIT_QUIZ'; payload: QuizData }
  | { type: 'SUBMIT_ANSWER'; payload: { questionId: string; selectedOption: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' };

interface QuizReducerState {
  quizData: QuizData | null;
  quizState: QuizState;
}

const initialState: QuizReducerState = {
  quizData: null,
  quizState: {
    currentQuestionIndex: 0,
    userAnswers: [],
    isCompleted: false,
    score: 0,
  },
};

function quizReducer(state: QuizReducerState, action: QuizAction): QuizReducerState {
  switch (action.type) {
    case 'INIT_QUIZ':
      return {
        quizData: action.payload,
        quizState: {
          currentQuestionIndex: 0,
          userAnswers: [],
          isCompleted: false,
          score: 0,
        },
      };

    case 'SUBMIT_ANSWER': {
      const { questionId, selectedOption } = action.payload;
      if (!state.quizData) return state;

      const question = state.quizData.questions.find((q) => q.id === questionId);
      if (!question) return state;

      const isCorrect = question.correctAnswer === selectedOption;
      const userAnswer: UserAnswer = {
        questionId,
        selectedOption,
        isCorrect,
      };

      return {
        ...state,
        quizState: {
          ...state.quizState,
          userAnswers: [...state.quizState.userAnswers, userAnswer],
        },
      };
    }

    case 'NEXT_QUESTION':
      return {
        ...state,
        quizState: {
          ...state.quizState,
          currentQuestionIndex: state.quizState.currentQuestionIndex + 1,
        },
      };

    case 'FINISH_QUIZ': {
      if (!state.quizData) return state;

      const correctCount = state.quizState.userAnswers.filter((a) => a.isCorrect).length;
      const totalQuestions = state.quizData.questions.length;
      const score = Math.round((correctCount / totalQuestions) * state.quizData.totalScore);

      return {
        ...state,
        quizState: {
          ...state.quizState,
          isCompleted: true,
          score,
        },
      };
    }

    case 'RESET_QUIZ':
      return {
        ...state,
        quizState: {
          currentQuestionIndex: 0,
          userAnswers: [],
          isCompleted: false,
          score: 0,
        },
      };

    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const value: QuizContextType = {
    state: state.quizState,
    quizData: state.quizData,
    initQuiz: (data: QuizData) => dispatch({ type: 'INIT_QUIZ', payload: data }),
    submitAnswer: (questionId: string, selectedOption: number) =>
      dispatch({ type: 'SUBMIT_ANSWER', payload: { questionId, selectedOption } }),
    nextQuestion: () => dispatch({ type: 'NEXT_QUESTION' }),
    finishQuiz: () => dispatch({ type: 'FINISH_QUIZ' }),
    resetQuiz: () => dispatch({ type: 'RESET_QUIZ' }),
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
