module.exports = {
  parserOpts: {
    headerPattern: /^(\w*)-(\d+):\s(.*)$/,
    headerCorrespondence: ['type', 'ticket', 'subject'],
  },
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'], // 禁用type为空的默认规则
    'subject-empty': [2, 'never'], // 禁用subject为空的默认规则
  },
}
