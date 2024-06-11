import React, { useState, useRef, useEffect } from "react";

const serverPanel = ({ currentServer, onServerOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servers, setServers] = useState([
    { id: "truyenfull", name: "Nguồn: Truyenfull" },
    { id: "thichtruyen", name: "Nguồn: Thichtruyen" },
  ]);
  const ref = useRef(null);
  const featureRef = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

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
    const savedOrder = JSON.parse(localStorage.getItem("serverOrder"));
    if (savedOrder) {
      const orderedServers = savedOrder.map(id => servers.find(server => server.id === id));
      setServers(orderedServers);
      onServerOrderChange(savedOrder);
    }
  }, []);

  const handleSort = () => {
    // Duplicate items
    let _servers = [...servers];

    // Remove and save the dragged item content
    const draggedItemContent = _servers.splice(dragItem.current, 1)[0];

    // Switch the position
    _servers.splice(dragOverItem.current, 0, draggedItemContent);

    // Reset the positions
    dragItem.current = null;
    dragOverItem.current = null;

    // Update the list
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
        >
          <p className="text-2xl font-semibold mb-4">Sắp xếp độ ưu tiên</p>
          <p className="text-md font-semibold mb-4">(Kéo thả để sắp xếp)</p>
          <ul>
            {servers.map((server, index) => (
              <li
                key={server.id}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className={`mb-2 p-2 rounded-md cursor-pointer text-coral-pink ${server.id === currentServer ? 'bg-grey' : ''}`}
              >
                {server.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default serverPanel;
