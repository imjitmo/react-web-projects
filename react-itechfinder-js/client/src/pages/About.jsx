import { Link } from 'react-router-dom';
import img from '../assets/about.svg';
import Button from '../layout/Button';
import Heading from '../layout/Heading';

export default function About() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 m-8">
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="About" title2="Us?" />
        <p className="text-lightText text-justify">
          Welcome to iTechFinder, your ultimate destination for cutting-edge technology solutions and gadgets.
          At iTechFinder, we believe in the power of technology to enhance lives, simplify tasks, and ignite
          creativity. Our mission is to provide our customers with access to the latest innovations,
          top-quality products, and exceptional customer service.
        </p>
        <p className="text-lightText text-justify">
          At iTechFinder, we believe in the power of technology to enhance lives, simplify tasks, and ignite
          creativity. Our mission is to provide our customers with access to the latest innovations,
          top-quality products, and exceptional customer service. Established with a passion for all things
          tech, iTechFinder is more than just a retail store; it&apos;s a haven for tech enthusiasts,
          professionals, and anyone seeking reliable tech solutions. Whether you&apos;re a seasoned tech
          aficionado or just dipping your toes into the world of gadgets, we have something for everyone.
        </p>
        <div className="text-lightText text-justify">
          <p>Our curated selection of products spans across various categories, including:</p>
          <ol className="list-decimal list-inside text-left pl-5">
            <li>
              <strong>Consumer Electronics:</strong> From smartphones to smart home devices, we offer a
              diverse range of consumer electronics that cater to your everyday needs and beyond.
            </li>
            <li>
              <strong>Computing Solutions:</strong> Explore our collection of laptops, desktops, peripherals,
              and accessories designed to boost productivity and elevate your computing experience.
            </li>
            <li>
              <strong>Gaming Gear:</strong> Dive into the world of immersive gaming with our range of gaming
              consoles, accessories, and components that take your gaming adventures to new heights.
            </li>
            <li>
              <strong>Audio and Entertainment:</strong> Immerse yourself in crystal-clear sound and
              captivating visuals with our lineup of audio equipment, home theater systems, and entertainment
              gadgets.
            </li>
            <li>
              <strong>Accessories and Gadgets:</strong> Enhance your tech arsenal with our selection.
            </li>
          </ol>
        </div>
        <p className="text-lightText text-justify">
          At iTechFinder, we prioritize quality, reliability, and innovation. We partner with leading brands
          and manufacturers to ensure that every product we offer meets the highest standards of performance
          and durability. Our team of tech enthusiasts is dedicated to staying ahead of the curve, keeping
          abreast of the latest trends and advancements in the tech industry to bring you the best products
          available.
        </p>
        <p className="text-lightText text-justify">
          Customer satisfaction is at the heart of everything we do. Whether you&apos;re seeking expert
          advice, technical support, or assistance with your purchase, our friendly and knowledgeable staff
          are here to help. We strive to create a seamless shopping experience for our customers, providing
          easy navigation, secure transactions, and prompt delivery services.
        </p>
        <p className="text-lightText text-justify">
          Thank you for choosing iTechFinder as your go-to destination for all your tech needs. Join us on
          this exciting journey as we continue to explore the endless possibilities of technology together.
        </p>
        <Link to="/contact">
          <Button spy={true} smooth={true} duration={500} title="Contact Us" />
        </Link>
      </div>
    </div>
  );
}
