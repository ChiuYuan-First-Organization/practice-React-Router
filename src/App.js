import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <div>
      <MainNavigation />
      <Layout>
        <Suspense // a built-in component for working wiht lazy loading.
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
                <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteId">
                <QuoteDetail />
            </Route>
            <Route path="/new-quote">
                <NewQuote />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

export default App;
