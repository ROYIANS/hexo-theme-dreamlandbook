hexo.extend.generator.register('404', function (locals) {
  return {
    path: '404.html',
    layout: ['page'],
    data: {
      title: '404',
      type: '404',
      comment: false
    }
  }
})
