/*
 * @Author: ROYIANS
 * @Date: 2023/5/5 16:02
 * @Description:
 * @sign:
 * ╦═╗╔═╗╦ ╦╦╔═╗╔╗╔╔═╗
 * ╠╦╝║ ║╚╦╝║╠═╣║║║╚═╗
 * ╩╚═╚═╝ ╩ ╩╩ ╩╝╚╝╚═╝
 */
hexo.extend.helper.register('increase_step_counter', function (key, startIndex = 1) {
  key = '_cache_counter_' + key
  const counter = hexo.locals.get(key)
  if (counter === undefined) {
    hexo.locals.set(key, function(){
      return startIndex
    });
  }
  return {
    value: () => {
      const resCounter = hexo.locals.get(key)
      hexo.locals.set(key, function(){
        return resCounter + 1
      })
      return resCounter
    },
    clear: () => hexo.locals.set(key, function(){
      return 0
    })
  }
})
