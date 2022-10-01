'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name : '💪  WIP:      工作进行中'
    },
    {
      value: 'feat',
      name : '✨  feat:     新增功能'
    },
    {
      value: 'adjust',
      name : '😊  adjust:   功能调整'
    },
    {
      value: 'fix',
      name : '🐞  fix:      修复Bug'
    },
    {
      value: 'refactor',
      name : '🛠   refactor: 除了功能新增更新和Bug修复之外的调整'
    },
    {
      value: 'docs',
      name : '📚  docs:     新增或更新文档'
    },
    {
      value: 'test',
      name : '🏁  test:     添加或更新测试用例'
    },
    {
      value: 'chore',
      name : '🗯   chore:    其他修改，比如更新构建任务、包管理器'
    },
    {
      value: 'style',
      name : '💅  style:    格式化代码'
    },
    {
      value: 'revert',
      name : '⏪  revert:   回退提交'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};