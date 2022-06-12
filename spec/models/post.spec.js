const mongoose = require("mongoose");

require("../mongodb_helper");
const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      mockUserId = new mongoose.Types.ObjectId();
      done();
    });
  });

  it("has a message, user id, comments array, likes array and created at time", () => {
    const post = new Post({ message: "some message", user_id: mockUserId });

    expect(post.message).toEqual("some message");
    expect(post.user_id).toBe(mockUserId);
    expect(Array.from(post.likes)).toEqual([]);
    expect(Array.from(post.likes)).toEqual([]);
    expect(post.created_at).not.toBeNull();
  });

  it("can have an image url", () => {
    const post = new Post({ image: "https://image.com", user_id: mockUserId });
    expect(post.image).toBe("https://image.com");
  });

  it("requires a user_id", (done) => {
    const post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).not.toBeNull;
      done();
    });
  });

  it("requires a message", (done) => {
    const post = new Post({ user_id: mockUserId });

    post.save((err) => {
      expect(err).not.toBeNull;
      done();
    });
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({ message: "some message", user_id: mockUserId });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "some message",
          user_id: mockUserId,
        });
        done();
      });
    });
  });

  it("can save an image post", (done) => {
    const post = new Post({
      image: "https://image.com",
      user_id: mockUserId,
      message: "test",
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          image: "https://image.com",
          user_id: mockUserId,
        });
        done();
      });
    });
  });
});
