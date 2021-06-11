const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let arr = blogs.map((blog) => blog.likes);
  return arr.reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  let max = { likes: 0 };
  blogs.map((blog) => {
    if (blog.likes > max.likes) {
      max = blog;
    }
  });
  return max;
};

const mostLikes = (blogs) => {
  let arr = [...new Set(blogs.map((blog) => blog.author))];

  let arr2 = arr.map((author) => {
    return { author, likes: 0 };
  });

  blogs.map((blog) => {
    arr2.map((concBlog) => {
      if (blog.author == concBlog.author) {
        concBlog.likes += blog.likes;
      }
    });
  });
  try {
    let max = arr2.reduce((prev, current) =>
      prev.likes > current.likes ? prev : current
    );

    return [max];
  } catch (TypeError) {
    return [];
  }
};

const mostBlogs = (blogs) => {
  let arr = [...new Set(blogs.map((blog) => blog.author))];
  let arr2 = arr.map((author) => {
    return { author, blogs: 0 };
  });
  blogs.map((blog) => {
    arr2.map((concBlog) => {
      if (blog.author == concBlog.author) {
        concBlog.blogs += 1;
      }
    });
  });
  try {
    let max = arr2.reduce((prev, current) =>
      prev.blogs > current.blogs ? prev : current
    );
    return max;
  } catch (TypeError) {
    return;
  }
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
