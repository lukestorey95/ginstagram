const mongoose = require("mongoose");

require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      mockPostId = new mongoose.Types.ObjectId();
      mockUserId = new mongoose.Types.ObjectId();

      done();
    });
  });

  it("should have a message, user id and post id", () => {
    const comment = new Comment({
      post_id: mockPostId,
      user_id: mockUserId,
      message: "a comment",
    });

    expect(comment.message).toEqual("a comment");
    expect(comment.post_id).toBe(mockPostId);
    expect(comment.user_id).toBe(mockUserId);
  });

  it("should save the comment to the database", (done) => {
    const comment = new Comment({
      post_id: mockPostId,
      user_id: mockUserId,
      message: "another comment",
    });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "another comment" });
        expect(comments[0]).toMatchObject({ user_id: mockUserId });
        done();
      });
    });
  });
});
