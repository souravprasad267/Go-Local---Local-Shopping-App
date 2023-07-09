import { Typography } from "antd";

const ContactUs = () => {
  return (
    <div>
      <h1>Contact US</h1>
      <p>
        For order related queries, send an E-mail to:{" "}
        <Typography.Link href={""}>ordersupport@email.com</Typography.Link>
      </p>
      <p>
        For account related queries, send an E-mail to:{" "}
        <Typography.Link href={""}>accountsupport@email.com</Typography.Link>
      </p>
      <p>
        Customer Support:{" "}
        <Typography.Link href={""}>+91 9876543210</Typography.Link>
      </p>
    </div>
  );
};
export default ContactUs;
