const listHelper = require("../utils/list_helper");

describe("author with most blogs", () => {
  test("with many blogs", () => {
    const blogs = [
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 4,
        id: "60bb9e3d6811ab847c0c5f52",
      },
      {
        title: "new blog!",
        author: "ButtNuster",
        url: "localhost",
        likes: 3,
        id: "60bb9e6a6811ab847c0c5f56",
      },
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bb9e6d6811ab847c0c5f57",
      },
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bba4a7bf22bf93d21ed2d6",
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "BUttNuster", blogs: 3 });
  });

  test("with one blog", () => {
    const blogs = [
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bba4a7bf22bf93d21ed2d6",
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "BUttNuster", blogs: 1 });
  });

  test("with emty blog", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual();
  });
});
