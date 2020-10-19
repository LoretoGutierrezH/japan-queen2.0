import React, { Fragment } from 'react';

const Product = (props) => {
  return (
    <Fragment>
        <tr>
          <td>{props.name}</td>
          <td>{props.price}</td>
          <td>
            <select name="quaintity" id="" defaultValue="0">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </td>
        </tr>
    </Fragment>
  );
}

export default Product;