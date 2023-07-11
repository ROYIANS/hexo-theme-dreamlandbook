const fs = require('fs');
const path = require('path');
const matter = require('front-matter');

const i18n = (str) => {
  return hexo.theme.i18n._p(hexo.theme.i18n.languages)(str)
}

const getUuid = (len = 20, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

function generateChapters(dirPath, level, bookTitle, bookPath, bookId) {
  const chapters = [];
  const articles = [];

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 是目录则递归处理子章节
      const subChapters = generateChapters(filePath, level + 1, bookTitle, bookPath, bookId);
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
    } else if (stats.isFile()) {
      const extname = path.extname(filePath);
      const basename = path.basename(filePath)
      if (extname === '.md' && basename !== 'index.md') {
        // 获取文章信息
        const postPath = filePath.replace(hexo.source_dir, '').replace(/\\/g, '/');
        let post = hexo.locals.get('posts').find({ source: postPath });
        post.data[0].book = {
          title: bookTitle,
          path: bookPath,
          id: bookId
        }

        if (post.data && post.data.length === 1) {
          articles.push({
            path: post.data[0].path,
            title: post.data[0].title
          });
        }
      }
    }
  }

  articles.sort((a, b) => {
    if (a.order && b.order) {
      return a.order - b.order
    }
    return b.date - a.date
  });
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

  const books = {};

  const allBooks = []

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
        let category = data.category || i18n('books.uncategorized')
        let booksCategory = books[category] || []
        const bookId = getUuid()
        const book = {
          id: bookId,
          path: bookPath,
          level: 0,
          ...data,
          category: data.category || i18n('books.uncategorized'),
          ...generateChapters(filePath, 0, data.title, bookPath, bookId)
        }
        booksCategory.push(book)
        allBooks.push(book)
        // 处理完所有文件和目录之后，books数组就包含了所有书籍的信息
        booksCategory.sort((a, b) => a.order - b.order);
        books[category] = booksCategory
      }
    }
  }


  locals.data.books = books;
  locals.data.allBooks = allBooks;

  // TODO: 看看有没有简便的取法
  const bookTitle = i18n('books.title')

  return [
    {
      path: 'books/',
      layout: 'page',
      data: {
        title: bookTitle,
        type: 'books',
        books: books,
        allBooks: allBooks
      }
    },
    ...allBooks.map(book => {
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
