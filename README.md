# Quiz Flow - H5答题应用

一个基于 React + TypeScript + Tailwind CSS 构建的移动端答题应用。

## 功能特性

- ✅ 移动端H5适配，流畅的答题体验
- ✅ 单题展示，四选一答题模式
- ✅ 实时进度条显示
- ✅ 答题完成后显示总分（满分100分）
- ✅ 根据分数区间展示不同的评价文案
- ✅ 答题详情回顾，显示正确答案和解析
- ✅ 支持重新答题
- ✅ TypeScript类型安全，接口定义统一
- ✅ 初期使用Mock数据，预留接口接入能力

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具
- **Tailwind CSS** - 原子化CSS框架
- **React Context + useReducer** - 状态管理

## 项目结构

```
quiz-flow/
├── src/
│   ├── components/          # 组件
│   │   ├── Question.tsx     # 题目组件
│   │   ├── Result.tsx       # 结果页组件
│   │   └── Review.tsx       # 答题回顾组件
│   ├── types/               # TypeScript类型定义
│   │   └── quiz.ts          # 题库相关类型
│   ├── api/                 # API封装
│   │   └── quiz.ts          # 题库API（预留接口）
│   ├── store/               # 状态管理
│   │   └── QuizContext.tsx  # 答题状态管理
│   ├── data/                # 数据
│   │   └── mockQuiz.ts      # Mock题库数据
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── tailwind.config.js       # Tailwind配置
├── vite.config.ts           # Vite配置
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/ 即可在浏览器中查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 核心类型定义

### Question - 题目数据结构

```typescript
interface Question {
  id: string;           // 题目ID
  question: string;     // 题目内容
  options: string[];    // 选项数组（4个选项）
  correctAnswer: number; // 正确答案索引（0-3）
  explanation: string;  // 答案解析
}
```

### QuizData - 题库数据结构

```typescript
interface QuizData {
  title: string;          // 题库标题
  questions: Question[];  // 题目列表
  totalScore: number;     // 总分
}
```

## 接入真实接口

当前应用使用 Mock 数据，要接入真实接口，请按以下步骤操作：

### 1. 修改 API 文件

编辑 `src/api/quiz.ts`：

```typescript
export async function fetchQuizData(): Promise<QuizData> {
  const response = await fetch('/api/quiz');
  const data = await response.json();
  return data;
}
```

### 2. 修改 App 组件

编辑 `src/App.tsx`，将 `initQuiz(mockQuizData)` 改为：

```typescript
useEffect(() => {
  fetchQuizData().then((data) => {
    initQuiz(data);
  });
}, []);
```

### 3. 接口返回数据格式

确保后端接口返回的数据符合 `QuizData` 类型定义：

```json
{
  "title": "题库标题",
  "totalScore": 100,
  "questions": [
    {
      "id": "1",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "correctAnswer": 0,
      "explanation": "答案解析"
    }
  ]
}
```

## 自定义题库

### 修改 Mock 数据

编辑 `src/data/mockQuiz.ts`，修改 `mockQuizData` 对象中的题目内容。

### 自定义分数区间描述

编辑 `src/data/mockQuiz.ts`，修改 `scoreRanges` 数组：

```typescript
export const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 40,
    title: '继续加油！',
    description: '你的描述文案...',
  },
  // 添加更多分数区间...
];
```

## 移动端适配说明

- 使用 Tailwind CSS 的响应式工具类进行适配
- 最大宽度限制为 `max-w-2xl`（移动端全屏，桌面端居中）
- 推荐在移动设备或浏览器开发者工具的移动设备模式下查看效果

## 开发说明

- 状态管理使用 React Context + useReducer，轻量且易于维护
- 所有类型定义在 `src/types/quiz.ts`，确保类型安全
- 组件使用函数式组件 + Hooks
- 样式使用 Tailwind CSS 原子类，易于定制

## License

MIT
