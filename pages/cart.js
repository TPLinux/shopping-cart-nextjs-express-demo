import React from "react";
import { connect } from "react-redux";
import {
  editCount,
  removeProduct,
  emptyCart,
} from "../redux/actions/cartActions";
import Header from "../componenets/Header";

function CartTable(props) {
  let { items } = props;
  console.log(items);
  let rows = items.map((prd) => (
    <tr key={prd._id}>
      <td>{prd.name}</td>
      <td>{prd.category}</td>
      <td>{prd.price}</td>
      <td>{prd.count}</td>
      <td>{prd.count * prd.price}</td>
      <td>
        <button className="btn red-btn" onClick={() => props.onDelete(prd._id)}>
          DELETE
        </button>
      </td>
      <td>
        <button className="btn blue-btn" onClick={() => props.onEdit(prd._id)}>
          EDIT
        </button>
      </td>
    </tr>
  ));
  return (
    <div id="cart-cont">
      <button className="btn red-btn" onClick={() => props.onEmpty()}>
        {" "}
        EMPTY CART
      </button>
      <br />
      <br />
      <table id="cart-items">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product category</th>
            <th>Product price</th>
            <th>Quantity</th>
            <th>Quantity Price</th>
            <th>DELETE</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <h3>
        Total Cost:{" "}
        {items.reduce((total, item) => total + item.count * item.price, 0)} $
      </h3>
      <button className="btn orange-btn" onClick={() => props.onPlaceOrder()}>
        {" "}
        PLACE ORDER
      </button>
    </div>
  );
}

class Cart extends React.Component {
  //static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
  }

  edit(prdId) {
    let newCount = parseInt(
      window.prompt("Please Enter the new number of quantity: ")
    );
    if (newCount <= 0) {
      this.props.removeProduct(prdId);
    } else {
      this.props.editCount(prdId, newCount);
    }
  }

  placeOrder() {
    let products = this.props.cart.cart.map((p) => ({
      product: p._id,
      count: p.count,
      priceAtOrderTime: p.price,
    }));
    fetch("/api/orders/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        window.alert(resp.code);
        if (resp.status) this.props.emptyCart();
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <>
        <Header />
        <div className="content">
          <h1>Shopping Cart</h1>
          {this.props.cart.cart.length == 0 ? (
            <b>There is no products added to cart.</b>
          ) : (
            <CartTable
              items={this.props.cart.cart}
              onDelete={(prdId) => this.props.removeProduct(prdId)}
              onEdit={(prdId) => this.edit(prdId)}
              onEmpty={() => this.props.emptyCart()}
              onPlaceOrder={() => this.placeOrder()}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeProduct,
  editCount,
  emptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
