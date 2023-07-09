import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="appFooter">
      <Typography.Link href="/privacy-policy">Privacy Policy</Typography.Link>
      <Typography.Link href="/return-policy">Return Policy</Typography.Link>
      <Typography.Link href="/tnc">Terms & Conditions</Typography.Link>
      <Typography.Link href="/contact-us">Contact Us</Typography.Link>
    </div>
  );
}
export default AppFooter;
