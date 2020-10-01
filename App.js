import React, { Component } from "react";
import "./App.css";

const formatNumber = number =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      products: [],
      total: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
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

        let allProducts = nested.reduce((acc, current) => [...acc, ...current]);
        let products = [];

        allProducts.forEach(item => {
          let existing = products.filter(
            (productsItem, index) => productsItem.id === item.id
          );

          if (existing.length) {
            let existingIndex = products.indexOf(existing[0]);
            products[existingIndex].sold += item.sold;
          } else {
            products.push(item);
          }
        });

        products.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );

        let unitsRevenue = [];
        for (let i = 0; i < products.length; i++) {
          unitsRevenue.push(products[i].unitPrice * products[i].sold);
        }

        let total = formatNumber(
          unitsRevenue.reduce((acc, current) => acc + current)
        );

        this.setState({ products, total });
      });
  }

  render() {
    const { products, isLoading, isError } = this.state;

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
            {products.map(product => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{formatNumber(product.unitPrice * product.sold)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{this.state.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
