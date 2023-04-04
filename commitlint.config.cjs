module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // feat: 添加新功能
        'feat',
        // fix: 修复bug
        'fix',
        // docs: 修改文档，比如 README、CHANGELOG等等
        'docs',
        // style: 代码格式化等不影响代码运行的修改
        'style',
        // refactor: 重构代码，既不修复 bug 也不新增功能
        'refactor',
        // chore：改变构建流程、或者修改依赖库、工具等
        'chore',
        // test: 新增或修改测试代码
        'test',
        // revert: 撤销上一次的 commit
        'revert',
      ],
    ],
    'fix-with-issue-id': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'fix-with-issue-id': function ({ type, subject }) {
          if (type === 'fix') {
            return [
              /#\d+$/.test(subject),
              'Error: 请在消息内容后面加上gira系统的issue编号, 如: fix: xxxx#1234',
            ]
          }
          return [true]
        },
      },
    },
  ],
}
