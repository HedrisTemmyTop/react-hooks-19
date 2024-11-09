import { Suspense, useDeferredValue, useId, useRef, useState } from "react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import Imperative from "./components/Imperative";

function App() {
  const [query, setQuery] = useState("");
  const deferredValue = useDeferredValue(query);
  const ref = useRef(null);
  const id = useId();
  const uniqueId = useId();
  const isStale = query != deferredValue;

  return (
    <div>
      {" "}
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <div>Unique id: {id}</div>
      <div>Unique id: {uniqueId}</div>
      <Imperative ref={ref} placeholder="Enter your name" />
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        >
          <SearchResults query={deferredValue} />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
