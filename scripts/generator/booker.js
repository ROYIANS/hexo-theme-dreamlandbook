const fs = require('fs');
const path = require('path');
const matter = require('front-matter');

function generateChapters(dirPath, level, bookTitle, bookPath) {
  const chapters = [];
  const articles = [];

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 是目录则递归处理子章节
      const subChapters = generateChapters(filePath, level + 1, bookTitle, bookPath);
      if (subChapters.chapters.length > 0 || subChapters.articles.length > 0) {
        // 处理章节信息...
        const indexFile = path.join(filePath, 'index.md');
        const content = fs.readFileSync(indexFile, 'utf-8');
        const data = matter(content).attributes
        // 将子章节合并到父章节中
        chapters.push({
          level: level + 1,
          ...data,
          ...subChapters
        });
      }
    } else if (stats.isFile()) {
      const extname = path.extname(filePath);
      const basename = path.basename(filePath)
      if (extname === '.md' && basename !== 'index.md') {
        // 获取文章信息
        const postPath = filePath.replace(hexo.source_dir, '').replace(/\\/g, '/');
        let post = hexo.locals.get('posts').find({ source: postPath });
        post.data[0].book = {
          title: bookTitle,
          path: bookPath
        }

        if (post.data && post.data.length === 1) {
          articles.push(post.data[0]);
        }
      }
    }
  }

  articles.sort((a, b) => b.date - a.date);
  // 按照章节顺序排序
  chapters.sort((a, b) => a.order - b.order);

  return {
    chapters,
    articles
  };
}

hexo.extend.generator.register('booker', function (locals) {
  const fs = require('fs');
  const path = require('path');

  const postDir = hexo.source_dir + '_posts';

  const books = [];

  // 读取_post目录下的所有文件和目录
  const files = fs.readdirSync(postDir);

  // 遍历所有文件和目录
  for (const file of files) {
    const filePath = path.join(postDir, file);
    const stats = fs.statSync(filePath);

    // 如果是目录，则认为是一个书籍目录
    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.md');
      // 如果该目录下存在index.md文件，则认为是一个书籍目录
      if (fs.existsSync(indexFile)) {
        // 处理书籍信息...
        const content = fs.readFileSync(indexFile, 'utf-8');
        const data = matter(content).attributes;
        const bookPath = `books/${file}/`
        books.push({
          path: bookPath,
          level: 0,
          ...data,
          ...generateChapters(filePath, 0, data.title, bookPath)
        })
      }
    }
  }

  // 处理完所有文件和目录之后，books数组就包含了所有书籍的信息
  books.sort((a, b) => a.order - b.order);


  locals.data.books = books;

  return [
    {
      path: 'books/',
      layout: 'page',
      data: {
        title: 'Books',
        type: 'books',
        books: books
      }
    },
    ...books.map(book => {
      return {
        path: book.path,
        layout: 'page',
        data: {
          title: book.title,
          type: 'books',
          isCatalog: true,
          book: book
        }
      }
    })
  ];
});
