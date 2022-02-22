const FIREBASE_DATABASE =
  "https://quotes-database-1fe44-default-rtdb.asia-southeast1.firebasedatabase.app";

export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DATABASE}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quotes = { id: key, ...data[key] };
    transformedQuotes.push(quotes);
  }

  return transformedQuotes;
};

export const getSingleQuote = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DATABASE}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = { id: quoteId, ...data };

  return loadedQuote;
};

export const addQuote = async (quoteData) => {
  const response = await fetch(`${FIREBASE_DATABASE}/quotes.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
};

export const addComment = async (requestData) => {
  const response = await fetch(
    `${FIREBASE_DATABASE}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData.commentData),
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return {commentId: data.name};
};

export const getAllComments = async (quoteId) => {
    const response = await fetch(`${FIREBASE_DATABASE}/comments/${quoteId}.json`);
    const data = await response.json();
    const transformedComments = [];

    for (const key in data) {
        const comment = {id: key, ...data[key]};
        transformedComments.push(comment);
    }

    return transformedComments;
};
