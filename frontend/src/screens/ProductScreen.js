import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    // navigate(`/cart/${id}?qty=${qty}`);

    navigate({
      pathname: `/cart/${id}`,
      search: `?qty=${qty}`,
    });
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3 '>
        Go Back
      </Link>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>

              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews `}
                  color={'#f8e825'}
                ></Rating>
              </ListGroupItem>

              <ListGroupItem>Price: ${product.price}</ListGroupItem>

              <ListGroupItem>Description: ${product.description}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>

              <ListGroupItem>
                <Row>
                  <Col> Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <FormControl
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem className='d-grid gap-2'>
                <Button
                  onClick={addToCartHandler}
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
