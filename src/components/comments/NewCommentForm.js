import styles from "./NewCommentForm.module.css";

import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";

import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddComment, quoteId } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    const commentValue = commentRef.current.value;

    sendRequest({ commentData: { text: commentValue }, quoteId });
  };

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {status === "pending" && (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentRef}></textarea>
      </div>
      <div className={styles.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
