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
      toast.classList.add(...'toast invisible w-10 h-10 m-auto inset-x-0 z-100 fixed text-sm whitespace-nowrap rounded-full text-center bg-black text-white'.split(' '))
      toast.id = seed
      let toastMessage = document.createElement('div')
      toastMessage.classList.add(...'toast-message text-sm overflow-hidden whitespace-nowrap h-full leading-10 p-0 m-0 rounded-r-full bg-black text-white'.split(' '))
      toastMessage.innerText = message
      let toastIcon = document.createElement('div')
      toastIcon.classList.add(...'toast-icon w-10 h-10 float-left box-border p-2'.split(' '))
      if (icon === 'logo') {
        toastIcon.innerHTML = `<img class="w-6 h-6" alt="logo" src="${GLOBAL_CONFIG.logo}" />`
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
