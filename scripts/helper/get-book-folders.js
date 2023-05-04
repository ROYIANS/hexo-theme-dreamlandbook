hexo.extend.helper.register('getBooks', function() {
  const bookFolders = this.getBookFolders();

  const books = bookFolders.map(folder => {
    const bookDir = path.join(hexo.source_dir, '_posts', folder);
    return parseBookIndexFile(bookDir);
  });

  return books;
});
