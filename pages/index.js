import React from "react";
import { connect } from "react-redux";
import { addProduct } from "../redux/actions/cartActions";
import Header from "../componenets/Header";

function Products(props) {
  let { items } = props;
  let cards = items.map((prd) => (
    <div id="card" key={prd._id}>
      <img src={prd.imgUrl} />
      <h3>
        {prd.name} <span>{prd.price} $</span>
      </h3>
      <p>Available Quantities: {prd.availableQuantities}</p>
      <span id="cat">{prd.category}</span>
      <br />
      <br />
      <br />
      <br />
      <button className="btn" onClick={() => props.addToCart(prd)}>
        ADD TO CART
      </button>
      <br />
      <br />
    </div>
  ));

  return <div id="products-container">{cards}</div>;
}

class Index extends React.Component {
  //static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  add(prd) {
    this.props.addProduct(prd);
    window.alert("Successfuly added to cart.");
  }

  componentDidMount() {
    fetch("/api/products")
      .then((resp) => resp.json())
      .then((resp) => {
        this.setState({ ...resp });
        console.log(resp);
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <>
        <Header />
        <center className="content">
          {this.state.products.length == 0 ? (
            <h2>No products to list.</h2>
          ) : (
            <Products
              items={this.state.products}
              addToCart={(prd) => this.add(prd)}
            />
          )}
        </center>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
