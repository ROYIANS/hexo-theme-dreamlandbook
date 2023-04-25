/**
 * LittleDreamland
 * generate colors for main color
 */

'use strict'

const pick_color = require('../source/js/pick_color')

hexo.extend.helper.register('theme_main_color_set', function () {
  const themeMainColor = hexo.theme && hexo.theme.config && hexo.theme.config.site && hexo.theme.config.site.theme_color
  if (!themeMainColor) {
    return '<!- no color set ->'
  }
  let colorSet = pick_color.getThemeCluster(themeMainColor.replace('#', ''))
  colorSet.push(`--roy-theme: ${themeMainColor};`)
  colorSet.push(`--roy-theme-op: ${themeMainColor}23;`)
  colorSet.push(`--roy-theme-min: ${themeMainColor}10;`)
  return `<style>:root{${colorSet.join('\n')}}</style>`
})
