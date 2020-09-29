import React, { Component } from "react";
import "./App.css";

const formatNumber = number =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

// const init = {
//   method: "GET",
//   headers: {
//     "CONTENT-TYPE": "application/json"
//   },
//   mode: "cors",
//   cache: "default"
// };
// const request = new Request("./../public/api/branch1.json", init);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      branchData1: [],
      branchData2: [],
      branchData3: [],
      allProducts: []
    };
  }

  componentDidMount() {
    const urls = [
      "./api/branch1.json",
      "./api/branch2.json",
      "./api/branch3.json"
    ];

    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(checkStatus) // check the response of our APIs
          .then(parseJSON) // parse it to Json
          .catch(error => console.log("There was a problem!", error))
      )
    ).then(data => {
      // assign to requested URL as define in array with array index.
      const branchData1 = data[0];
      const branchData2 = data[1];
      const branchData3 = data[2];
      this.setState({
        branchData1: branchData1,
        branchData2: branchData2,
        branchData3: branchData3
      });

      console.log(branchData1);
      console.log(branchData2);
      console.log(branchData3);
    });
    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function parseJSON(response) {
      return response.json();
    }
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const fetchData = () => {
  //     const urls = [
  //       "./api/branch1.json",
  //       "./api/branch2.json",
  //       "./api/branch3.json"
  //     ];

  //     const allRequests = urls.map(url =>
  //       fetch(url)
  //         .then(response => {
  //           if (response.ok) {
  //             console.log("ok", url);

  //             return response.json();
  //           } else {
  //             throw new Error("Something went wrong ...");
  //           }
  //         })
  //         .then(data =>
  //           this.setState({
  //             allProducts: data.products,
  //             branchData1: data.products[0],
  //             branchData2: data.products[1],
  //             branchData3: data.products[2],
  //             isLoading: false
  //           })
  //         )
  //         .catch(error => this.setState({ error, isLoading: false }))
  //     );

  //     return Promise.all(allRequests);
  //   };

  //   fetchData().then(arrayOfResponses =>
  //     console.log("The data we got from the server:", arrayOfResponses)
  //   );
  // }

  render() {
    const { allProducts, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="product-list">
        <label>Search Products</label>
        <input type="text" />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{formatNumber(product.unitPrice * product.sold)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
