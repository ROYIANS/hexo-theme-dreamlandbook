# hexo-theme-dreamlandbook

<p align='center'>
  DreamlandBook 主题，魔改自 <a href="https://github.com/xbmlz/hexo-theme-maple">hexo-theme-maple</a> 主题。
</p>

<p align='center'>
  <a href="https://little-dream.land/">Live Demo</a>
  <br />
  国内用户请访问：<a href="https://blog.vidorra.life/" target="_blank">示例网站</a>
</p>

## 敬告

主题目前处于开发阶段，因此不论是配置或者界面风格，都有可能**产生比较大的变化**（2023.04-2023.10），这个是一个风险。


## 使用方法

1. 克隆仓库到本地/themes文件夹（文件夹命名为dreamlandbook）

```bash
git clone https://github.com/ROYIANS/hexo-theme-dreamlandbook
```

2. 将主题内的`postcss.config.js`和`tailwind.config.js`移动到hexo博客根目录下
3. 添加必要依赖：

```bash
yarn add autoprefixer postcss postcss-import postcss-load-config tailwindcss tailwindcss-typography
```

4. 修改主题`_config.yml`

```yml
...
theme: dreamlandbook
...
```
