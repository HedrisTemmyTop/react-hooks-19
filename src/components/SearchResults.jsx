import { fetchData } from "../data/data";

export default function SearchResults({ query }) {
  if (query === "") return null;

  const albums = use(fetchData(`/search?q=${query}`));

  if (albums.length === 0) return <p>No matches for {query}</p>;
  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

const use = function (promise) {
  console.log(promise.status);
  if (promise.status === "fulfilled") return promise.value;
  else if (promise.status === "rejected") return promise.reason;
  else if (promise.status === "pending") throw promise;
  else {
    promise.status = "pending";
    promise.then(
      (result) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
};
