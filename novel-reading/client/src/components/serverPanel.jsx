import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const serverPanel = ({ currentServer, onServerOrderChange, onServerClick }) => {
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

        // Chuyển đổi từ object sang mảng và bỏ qua defaultSource
        const serversArray = Object.keys(fetchedServers)
          .filter(key => key !== 'defaultSource')
          .map(key => ({
            id: key,
            ...fetchedServers[key]
          }));

        // Load server order from localStorage
        const serverOrder = JSON.parse(localStorage.getItem('serverOrder'));

        if (serverOrder) {
          // Convert both lists to sets for comparison
          const fetchedSet = new Set(serversArray.map(server => server.id));
          const storedSet = new Set(serverOrder);

          // If the sets are equal, sort the fetched list by the stored order
          if (Array.from(fetchedSet).every(value => storedSet.has(value))) {
            serversArray.sort((a, b) => serverOrder.indexOf(a.id) - serverOrder.indexOf(b.id));
          } else {
            // If the sets are not equal, update localStorage with the fetched list
            localStorage.setItem('serverOrder', JSON.stringify(serversArray.map(server => server.id)));
          }
        }

        setServers(serversArray);
        onServerOrderChange(serversArray.map(server => server.id));
      } catch (error) {
        console.error('Error fetching source:', error);
      }
    };

    fetchSourceServer();
  }, []);

  const handleSort = async () => {
    let _servers = [...servers];

    const draggedItemContent = _servers.splice(dragItem.current, 1)[0];
    _servers.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setServers(_servers);
    onServerOrderChange(_servers.map(server => server.id));

    await onServerClick(draggedItemContent.id);
  };

  return (
    <div>
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
                onClick={async () => await onServerClick(server.id)}
                className={`mb-2 p-2 rounded-md cursor-pointer text-coral-pink ${(server.name === currentServer || server.id === currentServer) ? 'bg-grey' : ''}`}
              >
                {server.id}: {server.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default serverPanel;
