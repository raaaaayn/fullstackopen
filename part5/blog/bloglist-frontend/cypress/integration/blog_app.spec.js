describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "poopuinu",
      username: "poopuinu",
      password: "123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("login", function () {
    it("user can login", function () {
      cy.get("#username").type("poopuinu");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
      cy.contains("poopuinu logged in");
    });

    it("user with invalid credentials cant login", function () {
      cy.get("#username").type("poopuinu");
      cy.get("#password").type("12345");
      cy.get("#login-button").click();
      cy.get(".alert").should("have.css", "color", "rgb(255, 0, 0)");
      cy.contains("Invalid Credentials");
    });
  });

  describe("when loggend in", function () {
    beforeEach(function () {
      cy.login({ username: "poopuinu", password: "123" });
      // cy.get("#username").type("poopuinu");
      // cy.get("#password").type("123");
      // cy.get("#login-button").click();
      // cy.contains("poopuinu logged in");
    });

    it("a new blog can be created", function () {
      cy.get("#create-blog-expand").click();
      cy.get("#title").type("tests");
      cy.get("#author").type("test");
      cy.get("#url").type("test");
      cy.get("#create-blog").click();

      cy.contains("successfully added tests");
    });

    it("can like a blog", function () {
      cy.createBlog({ title: "tests", author: "test", url: "test" });
      // cy.get("#create-blog-expand").click();
      // cy.get("#title").type("tests");
      // cy.get("#author").type("test");
      // cy.get("#url").type("test");
      // cy.get("#create-blog").click();

      cy.contains("view").click();
      cy.get(".likes-button").click();
    });
  });
});
