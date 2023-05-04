/**
 * DreamlandBook
 * get a random color from chinese color
 */

'use strict'

const colorList = require('../../source/lib/color.json')

hexo.extend.helper.register('random_chinese_color', function () {
  const colorGroup = colorList[Math.floor(Math.random() * colorList.length)];
  return colorGroup[Math.floor(Math.random() * colorGroup.length)];
})
