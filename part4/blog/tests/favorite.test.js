const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  test("favorite out of many many blogs", () => {
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
        author: "BUttNuster",
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

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "new blog!",
      author: "BUttNuster",
      url: "localhost",
      likes: 4,
      id: "60bb9e3d6811ab847c0c5f52",
    });
  });

  test("favorite out of one blog", () => {
    const blogs = [
      {
        title: "new blog!",
        author: "BUttNuster",
        url: "localhost",
        likes: 2,
        id: "60bba4a7bf22bf93d21ed2d6",
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "new blog!",
      author: "BUttNuster",
      url: "localhost",
      likes: 2,
      id: "60bba4a7bf22bf93d21ed2d6",
    });
  });
});
