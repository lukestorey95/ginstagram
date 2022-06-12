var mongoose = require("mongoose");

require("../mongodb_helper");
var Like = require("../../models/like");

describe("Like model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.likes.drop(() => {
      mockPostId = new mongoose.Types.ObjectId();
      mockUserId = new mongoose.Types.ObjectId();

      done();
    });
  });

  it("contains the post and user ids", () => {
    const like = new Like({
      post_id: mockPostId,
      user_id: mockUserId,
    });

    expect(like.post_id).toEqual(mockPostId);
    expect(like.user_id).toEqual(mockUserId);
  });

  it("can list all likes", (done) => {
    Like.find((err, likes) => {
      expect(err).toBeNull();
      expect(likes).toEqual([]);
      done();
    });
  });

  it("can save a like", (done) => {
    const like = new Like({
      post_id: mockPostId,
      user_id: mockUserId,
    });

    like.save((err) => {
      expect(err).toBeNull();

      Like.find((err, likes) => {
        expect(err).toBeNull();

        expect(likes[0].user_id).toEqual(mockUserId);
        expect(likes[0].post_id).toEqual(mockPostId);
        done();
      });
    });
  });
});
