const Footer: React.FC = () => {
  return (<footer className="w-full flex flex-col px-10 py-2 mt-2 ">
    <div className="flex flex-row justify-between">

      <ul style={{ listStyleType: "unset" }} >
        <li>Terms & Conditions</li>
        <li>About Us</li>
        <li>FAQ's</li>
      </ul>
      <div className="flex flex-row justify-evenly gap-5 items-center">
        <h2>Instagram</h2>
        <h2>Facebook</h2>
      </div>
    </div>
    <h3 className="text-center">@NearVet 2024. All rigths reserved.</h3>
  </footer>);
};

export default Footer;