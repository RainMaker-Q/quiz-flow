import type { QuizData, ScoreRange } from '../types/quiz';

/**
 * Mock 题库数据
 */
export const mockQuizData: QuizData = {
  title: '前端开发知识测试',
  totalScore: 100,
  questions: [
    {
      id: '1',
      question: 'React中使用哪个Hook来管理组件的状态？',
      options: ['useEffect', 'useState', 'useContext', 'useMemo'],
      correctAnswer: 1,
      explanation: 'useState是React中用于在函数组件中添加状态的Hook。它返回一个状态值和一个更新该状态的函数。',
    },
    {
      id: '2',
      question: 'CSS中，哪个属性用于设置元素的弹性布局？',
      options: ['grid', 'flex', 'display: flex', 'flexbox'],
      correctAnswer: 2,
      explanation: 'display: flex 是设置弹性布局的正确方式。它将元素设置为弹性容器，使其子元素可以使用弹性布局特性。',
    },
    {
      id: '3',
      question: 'JavaScript中，哪个方法用于数组遍历并返回新数组？',
      options: ['forEach', 'map', 'filter', 'reduce'],
      correctAnswer: 1,
      explanation: 'map()方法创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值。forEach不返回新数组。',
    },
    {
      id: '4',
      question: 'TypeScript中，下列哪个关键字用于定义接口？',
      options: ['type', 'interface', 'class', 'struct'],
      correctAnswer: 1,
      explanation: 'interface关键字用于定义接口，描述对象的结构。type关键字也可以用于类型别名，但interface是定义接口的标准方式。',
    },
    {
      id: '5',
      question: 'HTTP状态码200表示什么？',
      options: ['请求失败', '请求成功', '重定向', '服务器错误'],
      correctAnswer: 1,
      explanation: '200 OK 表示请求成功。服务器已成功处理了请求并返回了请求的数据。',
    },
    {
      id: '6',
      question: 'Vite相比Webpack的主要优势是什么？',
      options: ['更小的打包体积', '更快的开发服务器启动', '更好的浏览器兼容性', '更多的插件'],
      correctAnswer: 1,
      explanation: 'Vite使用原生ES模块，在开发环境中无需打包，因此开发服务器启动速度极快，热更新也更快。',
    },
    {
      id: '7',
      question: 'CSS中，z-index属性的作用是什么？',
      options: ['设置元素宽度', '设置元素透明度', '控制元素层叠顺序', '设置元素旋转角度'],
      correctAnswer: 2,
      explanation: 'z-index属性控制定位元素的层叠顺序，值越大的元素显示在越上层。',
    },
    {
      id: '8',
      question: 'Promise的三种状态不包括以下哪个？',
      options: ['pending', 'fulfilled', 'rejected', 'canceled'],
      correctAnswer: 3,
      explanation: 'Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。没有canceled状态。',
    },
    {
      id: '9',
      question: '在移动端开发中，rem单位的基准是什么？',
      options: ['视口宽度', '父元素字体大小', '根元素字体大小', '默认字体大小'],
      correctAnswer: 2,
      explanation: 'rem（root em）是相对于根元素（html元素）的font-size的单位，常用于移动端响应式布局。',
    },
    {
      id: '10',
      question: 'Tailwind CSS是什么类型的CSS框架？',
      options: ['组件库', '原子化CSS', '预处理器', 'CSS-in-JS'],
      correctAnswer: 1,
      explanation: 'Tailwind CSS是一个原子化（Utility-First）的CSS框架，提供大量的工具类来快速构建界面。',
    },
  ],
};

/**
 * 分数区间描述
 */
export const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 40,
    title: '继续加油！',
    description: '前端开发知识还需要加强，建议系统学习基础知识，多动手实践。不要气馁，每个大牛都是从这里走过来的！',
  },
  {
    min: 41,
    max: 60,
    title: '还不错！',
    description: '你已经掌握了一些前端开发的基础知识，但还有提升的空间。建议深入学习某个框架，并通过实际项目来巩固知识。',
  },
  {
    min: 61,
    max: 80,
    title: '很优秀！',
    description: '你对前端开发有较好的理解和掌握！继续保持学习的热情，关注新技术动态，提升工程化和性能优化能力。',
  },
  {
    min: 81,
    max: 100,
    title: '前端高手！',
    description: '恭喜你！你已经具备了扎实的前端开发知识。继续深耕技术细节，可以尝试参与开源项目或技术分享，帮助更多人成长！',
  },
];
