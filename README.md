## 敬告

主题目前处于开发阶段，因此不论是配置或者界面风格，都有可能<u>**产生比较大的变化**（2023.04-2023.10）</u>，这个是一个风险。
<div align="right">
  Language:
  <a title="Chinese" href="docs/en-US/README.md">🇺🇸</a>
  🇨🇳
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6b8f25a4-3d4a-42c0-bf79-2a2ab792e070/deploy-status)](https://app.netlify.com/sites/royians/deploys)


预览: 👍 [小梦岛](https://blog.vidorra.life/) || 🤞 [小梦岛（国外线路）](https://royians.netlify.app/)

文档: 📖 [Dreamland Book Docs（挖坑中，待完善）](https://blog.vidorra.life/books/hexo-theme-dreamlandbook/)

一款基于[hexo-theme-maple](https://github.com/xbmlz/hexo-theme-maple)修改的主題

# hexo-theme-dreamlandbook

![博客主页](https://s2.loli.net/2023/05/12/bfViMkJWOpFalHu.png)

![博客书架页面](https://s2.loli.net/2023/05/12/dnJqXvjF4DghELV.png)

## 💻 安裝

在博客根目录里安装最新版【推荐】

克隆仓库到本地博客`/themes`文件夹（文件夹重命名为dreamlandbook）

```bash
git clone https://github.com/ROYIANS/hexo-theme-dreamlandbook
```

## ⚙ 应用主题

1. 将主题内的`postcss.config.js`和`tailwind.config.js`移动到hexo博客根目录下

2. 你需要添加`postcss`、`tailwindcss`等必要依赖：

```bash
yarn add autoprefixer postcss postcss-import postcss-load-config tailwindcss tailwindcss-typography
```

4. 修改 hexo 配置文件`_config.yml`，把主题改为`dreamlandbook`

```yml
...
theme: dreamlandbook
...
```

## 更好的配置

- macos/linux
  在博客根目录运行

```bash
cp -rf ./themes/dreamland/_config.yml ./_config.dreamland.yml
```

- windows
  复制`/themes/dreamland/_config.yml`此文件到 hexo 根目录，并重命名为`_config.dreamland.yml`

## 开发计划

<iframe width="100%" height="300px" style="border: none" src="https://royians.notion.site/DreamlandBook-63be2c44cad845d7affbc4d5ec62d24d">
</iframe>

## 仓库统计

![仓库统计](https://repobeats.axiom.co/api/embed/85344a0267b16b67a5e7beedb3f070b82cc52388.svg "Repobeats analytics image")

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ROYIANS/hexo-theme-dreamlandbook&type=Date)](https://star-history.com/#ROYIANS/hexo-theme-dreamlandbook&Date)
