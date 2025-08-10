import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-sm text-white py-4 text-center bottom-0 left-0">
      <ul className="example-1">
        <li className="icon-content cursor-target">
          <a
            href="https://www.linkedin.com/in/jaideep-n-b647ab228"
            className="link"
            data-social="linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl" />
            <span className="tooltip">LinkedIn</span>
          </a>
        </li>
        <li className="icon-content cursor-target">
          <a
            href="https://github.com/jaideepn-09"
            className="link"
            data-social="github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl" />
            <span className="tooltip">GitHub</span>
          </a>
        </li>
        <li className="icon-content cursor-target">
          <a
            href="https://www.instagram.com/jai_deepn02/"
            className="link"
            data-social="instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl" />
            <span className="tooltip">Instagram</span>
          </a>
        </li>
        <li className="icon-content cursor-target">
          <a
            href="https://t.me/Jaideep_N"
            className="link"
            data-social="telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram className="text-2xl" />
            <span className="tooltip">Telegram</span>
          </a>
        </li>
        <li className="icon-content cursor-target">
          <a
            href="https://x.com/jaiDeepn09"
            className="link"
            data-social="x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="text-2xl" />
            <span className="tooltip">X</span>
          </a>
        </li>
      </ul>

      <style jsx global>{`
        /* Updated Footer Styles */
        .example-1 {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(3, 3, 27);
          border-radius: 30px;
          padding: 10px;
          height: 60px;
          width: 320px;
          margin: 0 auto;
          --glow-color: rgba(175, 175, 197, 0.3);
          --glow-hover: rgba(100, 100, 255, 0.6);
          box-shadow: 0 0 30px var(--glow-color);
        }

        .example-1:hover {
          box-shadow: 0 0 30px var(--glow-hover);
        }

        .icon-content {
          margin: 0 10px;
          position: relative;
        }

        .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #fff;
          color: #000;
          padding: 6px 10px;
          border-radius: 5px;
          opacity: 0;
          visibility: hidden;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .icon-content:hover .tooltip {
          opacity: 1;
          visibility: visible;
          top: -50px;
        }

        .link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          background-color: #000;
          transition: all 0.3s ease-in-out;
        }

        .link:hover {
          box-shadow: 3px 2px 45px 0px rgba(0, 0, 0, 0.12);
        }

        .link[data-social="linkedin"]:hover {
          color: #0a66c2;
        }
        .link[data-social="github"]:hover {
          color: rgb(44, 40, 40);
        }
        .link[data-social="instagram"]:hover {
          color: #e4405f;
        }
        .link[data-social="telegram"]:hover {
          color: #0088cc;
        }
        .link[data-social="x"]:hover {
          color: rgb(59, 62, 63);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
