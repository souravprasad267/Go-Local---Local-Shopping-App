import {
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Typography,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);

  const getLowerCase = (value) => {
    return value.toLowerCase();
  };

  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if (sortOrder === "az") {
        return getLowerCase(a.title) > getLowerCase(b.title)
          ? 1
          : getLowerCase(a.title) === getLowerCase(b.title)
          ? 0
          : -1;
      } else if (sortOrder === "za") {
        return getLowerCase(a.title) < getLowerCase(b.title)
          ? 1
          : getLowerCase(a.title) === getLowerCase(b.title)
          ? 0
          : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highLow") {
        return b.price - a.price;
      } else {
        return true;
      }
    });
    return sortedItems;
  };

  return (
    <div className="productsContainer">
      <div>
        <Typography.Text>Sort Items By: </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"az"}
          options={[
            {
              label: "A-Z",
              value: "az",
            },
            {
              label: "Z-A",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
      <List
        loading={loading}
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Card
              className="itemCard"
              title={product.title}
              key={index}
              cover={
                <Image
                  preview={false}
                  className="itemCardImage"
                  src={product.thumbnail}
                />
              }
              actions={[
                <Rate allowHalf disabled value={product.rating} />,
                <AddToCartButton item={product} />,
              ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price:{" "}
                    <Typography.Text delete type="danger">
                      ${product.price}
                    </Typography.Text>{" "}
                    $
                    {parseFloat(
                      product.price -
                        (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                    <br />
                    {`${product.discountPercentage}% Lower than MRP`}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                  >
                    {product.description}
                  </Typography.Paragraph>
                }
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
};

const AddToCartButton = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };

  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
};

export default Products;
