import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const serverPanel = ({ currentServer, onServerOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servers, setServers] = useState([]);
  const ref = useRef(null);
  const featureRef = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !featureRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSourceServer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/nguon`);
        const fetchedServers = response.data;

        // Chuyển đổi từ object sang mảng
        const serversArray = Object.keys(fetchedServers).map(key => ({
          id: key,
          ...fetchedServers[key]
        }));

        const savedOrder = JSON.parse(localStorage.getItem("serverOrder"));
        if (savedOrder) {
          const orderedServers = savedOrder
            .map(id => serversArray.find(server => server.id === id))
            .filter(Boolean); // Remove undefined values
          setServers(orderedServers);
          onServerOrderChange(savedOrder);
        } else {
          const initialOrder = serversArray.map(server => server.id);
          localStorage.setItem("serverOrder", JSON.stringify(initialOrder));
          onServerOrderChange(initialOrder);
          setServers(serversArray); // Set servers to the initial array if there's no saved order
        }
      } catch (error) {
        console.error('Error fetching source:', error);
      }
    };

    fetchSourceServer();
  }, [onServerOrderChange]);

  const handleSort = () => {
    let _servers = [...servers];

    const draggedItemContent = _servers.splice(dragItem.current, 1)[0];
    _servers.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setServers(_servers);
    const newOrder = _servers.map(server => server.id);
    localStorage.setItem("serverOrder", JSON.stringify(newOrder));
    onServerOrderChange(newOrder);
  };

  return (
    <div className="">
      <button
        ref={featureRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-coral-pink text-white p-5 rounded-lg shadow-lg"
      >
        <i className="fi fi-sr-chart-simple"></i>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-50 w-64 bg-white p-4 rounded-lg shadow-lg"
          style={{ transform: 'translateY(-100%)' }}
        >
          <p className="text-2xl font-semibold mb-4">Sắp xếp độ ưu tiên</p>
          <p className="text-md font-semibold mb-4">(Kéo thả để sắp xếp)</p>
          <ul>
            {servers.length > 0 && servers.map((server, index) => (
              <li
                key={server.id}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className={`mb-2 p-2 rounded-md cursor-pointer text-coral-pink ${server.id === currentServer ? 'bg-grey' : ''}`}
              >
                {server.id}: {server.url}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default serverPanel;
