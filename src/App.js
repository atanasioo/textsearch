import React, { useState } from "react";
import { articles } from "./articles";

const App = () => {
  const [searchText, setSearchText] = useState("");

  const highlightText = (text, searchText) => {
    if (!searchText) return text;
    return text.replace(
      new RegExp(searchText, "gi"),
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };
  

  const HighlitedArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchText.toLowerCase()) ||
      article.content.toLowerCase().includes(searchText.toLowerCase()) ||
      article.date.toLowerCase().includes(searchText.toLowerCase())
  );

  const count = HighlitedArticles.length;

 

  return (
    <div className="p-4 w-full">
      <h1 className=" font-bold text-2xl mb-2">
        Search
      </h1>
      <div className="w-full">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search articles..."
        className="border p-2 mb-2 w-full"
      />
      </div>
      <div className="mb-4">
        <small>
          {searchText && ` ${count} ${count === 1 ? "post were found." : "posts were found."} `}
        </small>
      </div>
      <div>
        {HighlitedArticles.map((article) => (
          <div key={article.id} className="mb-4 p-4 border rounded">
            <h2
              className="text-xl font-bold"
              dangerouslySetInnerHTML={{
                __html: highlightText(article.title, searchText),
              }}
            />
            <p
              className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{
                __html: highlightText(article.date, searchText),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: highlightText(article.content, searchText),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App