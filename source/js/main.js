// mobile menu
function registerMobileMenu() {
  $("#open-menu").click(function () {
    // set height auto
    $("#menu-panel").css("height", "auto");
    // set translate y 0
    $("#menu-content").css(
      "transform",
      "translate(0, 0) rotate(0) skew(0) scaleX(1) scaleY(1)"
    );
    $("#open-menu").css("display", "none");
    $("#close-menu").css("display", "block");
  });

  $("#close-menu").click(function () {
    // set height 0
    $("#menu-panel").css("height", "0");
    // set translate y -100%
    $("#menu-content").css(
      "transform",
      "translate(0, -100%) rotate(0) skew(0) scaleX(1) scaleY(1)"
    );
    $("#open-menu").css("display", "block");
    $("#close-menu").css("display", "none");
  });
}

// header page title
function registerHeaderPageTitle() {
  // 监听文章标题消失时，在header中显示文章标题
  new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) {
      $("#header-title")
        .css("opacity", "1")
        .css("transform", "translate(0, 0)")
        .css("transition", "all 0.3s");
    } else {
      $("#header-title")
        .css("opacity", "0")
        .css("transform", "translate(0, -100%)")
        .css("transition", "all 0.3s");
    }
  }).observe($("#article-title")[0], {
    threshold: 0,
  });
}

function registerHeaderBottomBorder() {
  const el = document.querySelector("#blog-header")
  const observer = new IntersectionObserver(
    ([e]) => {
      if (e.intersectionRatio < 1) {
        $("#blog-header")
          .css("border-bottom", "1px solid rgb(0 0 0 / 0.05)");
        $("#blog-title-href").toggleClass("hidden", false)
      } else {
        $("#blog-header")
          .css("border-bottom", "none");
        $("#blog-title-href").toggleClass("hidden", GLOBAL_CONFIG.isHome ? true : false)
      }
    },
    { threshold: [1] }
  );
  observer.observe(el);
}

// go top
function registerGoTop() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
      $("#go-top")
        .css("opacity", "1")
        .css("transform", "translateX(0) rotate(0)")
        .css("transition", "all 0.3s");
    } else {
      $("#go-top")
        .css("opacity", "0")
        .css("transform", "translateX(50px) rotate(180deg)")
        .css("transition", "all 0.3s");
    }
  });
  $("#go-top").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
  });
}

// copy code
function registerCopyCode() {
  $("figure.highlight").each(function () {
    const copyIcon = $(
      "<i class=\"ri-file-copy-line\" title=\"复制代码\"></i>"
    );
    const leftOffset = 25;
    // left
    const left = $(this).width() - leftOffset;
    // set style
    $(copyIcon).css("position", "absolute");
    $(copyIcon).css("left", `${left}px`);
    $(copyIcon).css("top", "15px");
    $(copyIcon).css("cursor", "pointer");
    $(copyIcon).css("font-style", "normal");
    // add icon
    $(this).append(copyIcon);
    // copy code
    $(copyIcon).click(function () {
      // .code .line
      const code = [...$(this).parent().find(".code .line")]
        .map((line) => line.innerText)
        .join("\n");
      // begin copy
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      var ta = document.createElement("textarea");
      ta.style.top = window.scrollY + "px"; // Prevent page scrolling
      ta.style.position = "absolute";
      ta.style.opacity = "0";
      ta.readOnly = true;
      ta.value = code;
      document.body.append(ta);
      const selection = document.getSelection();
      const selected =
        selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
      ta.select();
      ta.setSelectionRange(0, code.length);
      ta.readOnly = false;
      var result = document.execCommand("copy");
      // change icon
      $(this).attr("class", result ? "ri-check-fill" : "ri-close-fill");
      dlf.toast("复制成功", "default", "ri-file-copy-2-fill")
      ta.blur(); // For iOS
      // blur
      $(copyIcon).blur();
      if (selected) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }
      document.body.removeChild(ta);
      // setTimeout change icon
      setTimeout(() => {
        $(this).attr("class", "ri-file-copy-line");
      }, 1000); // 1s
    });

    // listen overflow-x change icon left
    $(this).scroll(function () {
      const scrollLeft = $(this).scrollLeft();
      const iconLeft = $(this).width() - leftOffset + scrollLeft;
      if (iconLeft > 0) {
        $(copyIcon).css("left", `${iconLeft}px`);
      }
    });
  });
}

function preventTouchGesture() {
  // 阻止双指放大页面
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
}

$(document).ready(function () {
  registerMobileMenu();
  registerGoTop();
  preventTouchGesture()
  registerHeaderBottomBorder();
  window.initComment && initComment();
  if ($("#article-title").length > 0) {
    registerHeaderPageTitle();
    registerCopyCode();
  }
});
