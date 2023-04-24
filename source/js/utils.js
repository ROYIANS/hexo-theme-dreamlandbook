/*
 * @Author: ROYIANS
 * @Date: 2023/4/19 9:25
 * @Description:
 * @sign:
 * ╦═╗╔═╗╦ ╦╦╔═╗╔╗╔╔═╗
 * ╠╦╝║ ║╚╦╝║╠═╣║║║╚═╗
 * ╩╚═╚═╝ ╩ ╩╩ ╩╝╚╝╚═╝
 */
const dlf = {

  saveToLocal: {
    set: function setWithExpiry(key, value, ttl) {
      if (ttl === 0) return
      const now = new Date()
      const expiryDay = ttl * 86400000
      const item = {
        value: value,
        expiry: now.getTime() + expiryDay,
      }
      localStorage.setItem(key, JSON.stringify(item))
    },

    get: function getWithExpiry(key) {
      const itemStr = localStorage.getItem(key)

      if (!itemStr) {
        return undefined
      }
      const item = JSON.parse(itemStr)
      const now = new Date()

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return undefined
      }
      return item.value
    }
  },

  uuid: () => {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
  },

  toast: (message, status = 'default', icon = 'ri-notification-3-fill') => {
    return new Promise((resolve) => {
      const seed = `toast-${dlf.uuid()}`
      let toast = document.createElement('div')
      toast.classList.add('toast')
      toast.id = seed
      let toastMessage = document.createElement('div')
      toastMessage.classList.add('toast-message')
      toastMessage.innerText = message
      let toastIcon = document.createElement('div')
      toastIcon.classList.add('toast-icon')
      if (icon === 'logo') {
        toastIcon.innerHTML = `<img class="toast-image" alt="logo" src="${GLOBAL_CONFIG.logo}" />`
      } else {
        toastIcon.innerHTML = `<i class="${icon}"></i>`
      }
      toast.classList.add("show", status);
      toast.appendChild(toastIcon);
      toast.appendChild(toastMessage);
      document.body.appendChild(toast);
      setTimeout(function () {
        toast.classList.remove("show", status)
        setTimeout(() => {
          toast.parentNode.removeChild(toast);
        }, 5000)
        resolve()
      }, 4900);
    })
  }
}
