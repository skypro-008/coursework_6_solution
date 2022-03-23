import React from "react";
import Comment from "../comment/Comment";

function CommentList({ comments, setComments}) {

  return (
    <ul className="Comment__list">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.pk}
            text={comment.text}
            adId={comment.ad_id}
            commentId={comment.pk}
            userId={comment.author_id}
            setComments={setComments}
            authorName={comment.author_first_name}
          />
        );
      })}
    </ul>
  );
}

export default CommentList;
