'use strict'

var renderer = require('./renderer')

hexo.extend.renderer.register('css', 'css', renderer)
