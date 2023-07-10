/*
 * @Author: ROYIANS
 * @Date: 2023/5/5 16:02
 * @Description:
 * @sign:
 * ╦═╗╔═╗╦ ╦╦╔═╗╔╗╔╔═╗
 * ╠╦╝║ ║╚╦╝║╠═╣║║║╚═╗
 * ╩╚═╚═╝ ╩ ╩╩ ╩╝╚╝╚═╝
 */
hexo.extend.helper.register('get_book', function (id) {
  const books = this.site.data.allBooks
  return books.find(item => item.id === id) || {}
})
