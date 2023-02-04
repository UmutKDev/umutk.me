import { FiGithub, FiLinkedin } from "react-icons/fi";

const Connections = (): JSX.Element => {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <ul className="flex space-x-3">
        <li>
          <a href="#" target="_blank" rel="noreferrer">
            <FiGithub className="text-white/80" size={20} />
          </a>
        </li>
        <li>
          <a href="#" target="_blank" rel="noreferrer">
            <FiLinkedin className="text-white/80" size={20} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Connections;
