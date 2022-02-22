import styles from "./Comments.module.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
import NewCommentForm from '../comments/NewCommentForm';

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedComments,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (status === "completed" && loadedComments.length === 0) {
    comments = <p className="centered">No comments were added yet.</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} quoteId={quoteId} />}
      {comments}
    </section>
  );
};

export default Comments;
