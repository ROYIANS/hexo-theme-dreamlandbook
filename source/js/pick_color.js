// 主题色的提取
const getThemeCluster = (theme) => {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) { // when primary color is in its rgb space
      return `#${color}`
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }
  }

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red.padStart(2, '0')}${green.padStart(2, '0')}${blue.padStart(2, '0')}`
  }

  const clusters = []

  for (let i = 0; i <= 9; i++) {
    const generatedTintColor = tintColor(theme, Number((i / 10).toFixed(2)))
    clusters.push(`--theme-primary-color${i === 0 ? '' : '-' + Number(i * 100)}: ${generatedTintColor};`)
  }

  for (let i = 1; i <= 5; i++) {
    const generatedShadeColor = shadeColor(theme, Number((i / 10).toFixed(2)))
    clusters.push(`--theme-primary-color-darker-${Number(i * 100)}: ${generatedShadeColor};`)
  }

  return clusters
}

module.exports = { getThemeCluster }
