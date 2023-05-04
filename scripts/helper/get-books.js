/*
 * @Author: ROYIANS
 * @Date: 2023/4/28 16:13
 * @Description:
 * @sign:
 * ╦═╗╔═╗╦ ╦╦╔═╗╔╗╔╔═╗
 * ╠╦╝║ ║╚╦╝║╠═╣║║║╚═╗
 * ╩╚═╚═╝ ╩ ╩╩ ╩╝╚╝╚═╝
 */

function parseBookIndexFile(bookDir) {
  const fs = require('fs');
  const path = require('path');
  const fm = require('front-matter');

  const filePath = path.join(bookDir, 'index.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = fm(fileContent);

  return {
    title: parsed.attributes.title || '',
    description: parsed.attributes.description || '',
    path: `/${path.basename(bookDir)}/`,
    chapters: []
  };
}

hexo.extend.helper.register('getBooks', function() {
  const bookFolders = this.getBookFolders();

  const books = bookFolders.map(folder => {
    const bookDir = path.join(hexo.source_dir, '_posts', folder);
    return parseBookIndexFile(bookDir);
  });

  return books;
});
