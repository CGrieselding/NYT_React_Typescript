// Functional Component
import React from "react";

const NYTDisplay = (props: any) => {
  const { results, changePage } = props;

  return (
    <div>
      <div>
        <button onClick={(e) => changePage(e, "down")}>
          Previous 10 Articles
        </button>
        <button onClick={(e) => changePage(e, "up")}>Next 10 Articles</button>
      </div>
      {results.map((result: any) => {
        return (
          <div key={result._id}>
            <h3 className="articleTitle">{result.headline.main}</h3>
            {result.multimedia.length > 1 ? (
              <img
                alt="article"
                src={`http://www.nytimes.com/${result.multimedia[1].url}`}
              />
            ) : (
              ""
            )}
            <p>
              {result.snippet}
              <br />
              {result.keywords.length > 0 ? <p className="keywords">Keywords:</p> : ""}
            </p>
            <ul style={{listStyleType: "none"}}>
              {result.keywords.map((keyword: any) => (
                <li key={keyword.value}>{keyword.value}</li>
              ))}
            </ul>
            <a href={result.web_url} target="_blank">
              <button>Read Article</button>
            </a>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default NYTDisplay;
