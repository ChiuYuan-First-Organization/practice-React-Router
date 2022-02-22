import styles from "./QuoteForm.module.css";

import { useState, useRef } from "react";
import { Prompt } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const author = authorInputRef.current.value;
    const text = textInputRef.current.value;
    props.onAddQuote({ author, text });
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const finishedEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
      />
      <Card>
        <form
          className={styles.form}
          onSubmit={submitHandler}
          onFocus={formFocusedHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={styles.control}>
            <label>Author</label>
            <input id="author" type="text" ref={authorInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button className="btn" onClick={finishedEnteringHandler}>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
