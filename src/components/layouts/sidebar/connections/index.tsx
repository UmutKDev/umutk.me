import { Connections as ConnectionsConfig } from "@/libs/config";

const Connections = (): JSX.Element => {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <ul className="flex space-x-4">
        {ConnectionsConfig.map((connection) => (
          <li key={connection.name}>
            <a
              href={connection.to}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full"
            >
              <connection.icon className="h-5 w-5  text-white/80 transition-colors duration-100 ease-in-out hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
