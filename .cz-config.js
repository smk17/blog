'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name : 'ðª  WIP:      å·¥ä½è¿è¡ä¸­'
    },
    {
      value: 'feat',
      name : 'â¨  feat:     æ°å¢åè½'
    },
    {
      value: 'adjust',
      name : 'ð  adjust:   åè½è°æ´'
    },
    {
      value: 'fix',
      name : 'ð  fix:      ä¿®å¤Bug'
    },
    {
      value: 'refactor',
      name : 'ð    refactor: é¤äºåè½æ°å¢æ´æ°åBugä¿®å¤ä¹å¤çè°æ´'
    },
    {
      value: 'docs',
      name : 'ð  docs:     æ°å¢ææ´æ°ææ¡£'
    },
    {
      value: 'test',
      name : 'ð  test:     æ·»å ææ´æ°æµè¯ç¨ä¾'
    },
    {
      value: 'chore',
      name : 'ð¯   chore:    å¶ä»ä¿®æ¹ï¼æ¯å¦æ´æ°æå»ºä»»å¡ãåç®¡çå¨'
    },
    {
      value: 'style',
      name : 'ð  style:    æ ¼å¼åä»£ç '
    },
    {
      value: 'revert',
      name : 'âª  revert:   åéæäº¤'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};