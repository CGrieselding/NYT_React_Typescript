// Class Component
import React from "react";
import NYTDisplay from "./NYTDisplay";

const baseURL: string =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key: string = "SCZrRgHl8UAUWFVKK0X6OKogZvvfjure";

type StateType = {
  search: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: string[];
};

export default class NYTApp extends React.Component<{}, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      startDate: "",
      endDate: "",
      pageNumber: 0,
      results: [],
    };
  }
  componentDidMount() {
    let url: string = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ results: data.response.docs }))
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    console.log(this.state.results);
  }

  handleSubmit = (e: any) => {
    this.setState({ pageNumber: 0 });
    e.preventDefault();
    this.componentDidMount();
  };

  changePageNumber = (e: any, direction: string): any => {
    e.preventDefault();
    if (direction === "down") {
      if (this.state.pageNumber > 0) {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
        this.componentDidMount();
      }
    }
    if (direction === "up") {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.componentDidMount();
    }
  };

  render() {

    return (
      <div>
        <h1 className="mainTitle">The New York Times Articles</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <span>Enter a single search term: </span>
          <input
            type="text"
            name="search"
            onChange={(e) => this.setState({ search: e.target.value })}
            required
          />
          <br />
          <span>Enter a start date: </span>
          <input
            type="date"
            name="startDate"
            pattern="[0-9]{8}"
            onChange={(e) => this.setState({ startDate: e.target.value })}
          />
          <br />
          <span>Enter an end date: </span>
          <input
            type="date"
            name="endDate"
            pattern="[0-9]{8}"
            onChange={(e) => this.setState({ endDate: e.target.value })}
          />
          <br />
          <button className="submit">Search</button>
        </form>
        {this.state.results.length > 0 ? (
          <NYTDisplay
            results={this.state.results}
            changePage={this.changePageNumber}
          />
        ) : null}
      </div>
    );
  }
}
