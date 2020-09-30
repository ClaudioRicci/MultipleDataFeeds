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
    this.setState({ isLoading: false });
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
        console.log(nested);
        // console.log(typeof result[0].products);
        // console.log(result[0].products);
        // let mergedObj = nested.reduce((acc, obj) => {
        //   if(acc[obj.product])
        // })

        let allProducts = nested.reduce((acc, current) => [...acc, ...current]);
        allProducts.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
        console.log(allProducts);
        // let res = allProducts.reduce(
        //   (a, b) => a.set(b.name, (a.get(b.name) || 0) + Number(b.sold)),
        //   new Map()
        // );
        // const productsSold = Array.from(res);

        // console.log(productsSold);
        this.setState({ allProducts: allProducts });
        // this.setState({ allProducts: productsSold });
        // const idAndSold = flat.map(
        //   ({ name, unitPrice, ...keepAttrs }) => keepAttrs
        // );
        // const productDetails = flat.map(({ sold, ...keepAttrs }) => keepAttrs);
        // console.log(idAndSold);
        // console.log(productDetails);
        // let productIdAndSold = idAndSold.reduce(
        //   (a, b) => a.set(b.id, (a.get(b.id) || 0) + Number(b.sold)),
        //   new Map()
        // );

        // let productFeatures = productDetails.reduce(
        //   (a, b) => a.set(b.id, b.name, b.unitPrice),
        //   new Map()
        // );

        // const productDescription = Array.from(productFeatures);
        // console.log(productDescription);
        // const productsSold = Array.from(productIdAndSold);

        // console.log(productsSold);

        // myArray.push(
        //   result[0].products,
        //   result[1].products,
        //   result[2].products
        // );
        // console.log(myArray);
        // myArray.push({ taxid: 1, tax_name: "VAT", tax_value: "25.00" });
        // myArray.push({ taxid: 2, tax_name: "Service Tax", tax_value: "20.00" });
        // myArray.push({ taxid: 1, tax_name: "VAT", tax_value: "25.00" });
        // myArray.push({ taxid: 2, tax_name: "Service Tax", tax_value: "75.00" });

        // let res = flat.reduce(
        //   (a, b) => a.set(b.name, (a.get(b.name) || 0) + Number(b.sold)),
        //   new Map()
        // );

        // const newArray = Array.from(res);
        // console.log(newArray);
        // console.log(res);
        // console.log(flat);
        // const arr = [
        //   {
        //     code: 1,
        //     item: "ball",
        //     salesman: "Braan",
        //     quantity: 5,
        //     price: 10.0
        //   },
        //   { code: 1, item: "shoe", salesman: "Alex", quantity: 5, price: 20.0 },
        //   { code: 1, item: "ball", salesman: "Max", quantity: 3, price: 10.0 },
        //   {
        //     code: 1,
        //     item: "shirt",
        //     salesman: "Braan",
        //     quantity: 5,
        //     price: 15.0
        //   }
        // ];

        // const list = [1, 2, 2];
        // console.log(new Set(arr)); // Set(2) {1, 2}
        // console.log([...new Set(arr)]); // [1,2]

        // const values = new Set(arr); // Set(2) {1, 2}
        // values.add(1); // this is essentially a no-op,
        // values.add(2); // so is this
        // console.log(values); // Set(2) {1, 2}

        // const newArr = flat.map(obj => {
        //   return {
        //     id: obj.id,
        //     name: obj.name,
        //     unitPrice: obj.unitPrice,
        //     sold: obj.sold
        //   };
        // });

        // const newArr = arr.map(obj => {
        //   return {
        //     code: obj.code,
        //     quantity: obj.quantity,
        //     price: obj.price,
        //     item: obj.item
        //   };
        // });

        // console.log(newArr);
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
