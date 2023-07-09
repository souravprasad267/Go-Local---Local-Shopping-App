import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Radio,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API";

const AppHeader = () => {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="appHeader">
      <Typography.Title>
        <Typography.Link href={"/"}>
          <h1>Go Local</h1>
        </Typography.Link>
      </Typography.Title>
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
              {
                label: "Sunglasses",
                key: "sunglasses",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
              {
                label: "Women's Tops",
                key: "tops",
              },
            ],
          },
          {
            label: "Smartphones",
            key: "smartphones",
          },
          {
            label: "Laptops",
            key: "laptops",
          },
          {
            label: "Groceries",
            key: "groceries",
          },
        ]}
      />
      <AppCart />
    </div>
  );
};

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  const onConfirmOrder = (values) => {
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Order placed successfully !");
  };

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItems.length}
        className="shopingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>

      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Cart Summary"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          bordered={true}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={1}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((cart) =>
                        cart.map((cartItem) => {
                          if (record.id === cartItem.id) {
                            cartItem.total = cartItem.price * value;
                          }
                          return cartItem;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return (
              <span>
                <br />
                Order Total: ${total}
              </span>
            );
          }}
        />
        <Button
          className="placeOrderButton"
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Place Order
        </Button>
      </Drawer>

      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Enter Your Details"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name..." />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email..." />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your address..." />
          </Form.Item>

          <Form.Item label="Payment Method" name="paymentMethod">
            <Radio.Group
              defaultValue={"cod"}
              disabled={true}
              options={[
                {
                  label: "Cash on Delivery",
                  value: "cod",
                },
                {
                  label: "Credit Card",
                  value: "cc",
                },
                {
                  label: "Debit Card",
                  value: "dc",
                },
                {
                  label: "Paypal",
                  value: "pp",
                },
              ]}
            ></Radio.Group>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="confirmOrderButton"
          >
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};
export default AppHeader;
