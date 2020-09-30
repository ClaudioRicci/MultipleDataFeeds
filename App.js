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
      isError: false,
      // branchData1: [],
      // branchData2: [],
      // branchData3: [],
      allProducts: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const urls = [
      "./api/branch1.json",
      "./api/branch2.json",
      "./api/branch3.json"
    ];

    Promise.all(urls.map(url => fetch(url)))
      .then(resp => Promise.all(resp.map(r => r.json())))
      .then(result => {
        const nested = [
          result[0].products,
          result[1].products,
          result[2].products
        ];
        // console.log(result[0].products);
        // let mergedObj = nested.reduce((acc, obj) => {
        //   if(acc[obj.product])
        // })

        let flat = nested.reduce((acc, it) => [...acc, ...it]);
        console.log(flat);
      });
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const urls = [
  //     "./api/branch1.json",
  //     "./api/branch2.json",
  //     "./api/branch3.json"
  //   ];

  //   Promise.all(
  //     urls.map(url =>
  //       fetch(url)
  //         .then(checkStatus) // check the response of our APIs
  //         .then(parseJSON) // parse it to Json
  //         .catch(error => console.log("There was a problem!", error))
  //     )
  //   ).then(data => {
  //     // assign to requested URL as define in array with array index.
  //     const branchData1 = data[0];
  //     const branchData2 = data[1];
  //     const branchData3 = data[2];
  //     this.setState({
  //       isLoading: false,
  //       branchData1,
  //       branchData2,
  //       branchData3
  //     });

  //     console.log(branchData1);
  //     console.log(branchData2);
  //     console.log(branchData3);
  //   });
  //   function checkStatus(response) {
  //     if (response.ok) {
  //       // this.setState({ isLoading: false, isError: false });
  //       return Promise.resolve(response);
  //     } else {
  //       // this.setState({ isLoading: false, isError: true });
  //       return Promise.reject(new Error(response.statusText));
  //     }
  //   }

  render() {
    const { allProducts, isLoading, isError } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error, no data loaded</p>;
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
