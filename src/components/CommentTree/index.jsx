import React from "react";
import Comment from "../Comment";

export default function CommentTree({ comments }) {
  return (
    <div>
      {comments?.map((comment) => {
        return (
          <div key={comment._id}>
            <Comment
              key={comment._id}
              comment={comment}
              commentList={comments}
            />
            {comment.children.length > 0 && (
              <CommentTree comments={comment.children} />
            )}
          </div>
        );
      })}
    </div>
  );
}
