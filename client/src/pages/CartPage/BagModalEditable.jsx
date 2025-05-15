import { Modal, ListGroup, Badge, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function BagModalEditable({ show, onHide, bag, onContentUpdate }) {
  const [removedItems, setRemovedItems] = useState([]);

  useEffect(() => {
    if (bag) {
      console.log("Modal mounted", bag);
      // Initialize with items already removed
      const existingRemoved = bag._removedItems || [];
      setRemovedItems(existingRemoved);
    }
  }, [bag]);

  const toggleItem = (itemName) => {
    const isRemoved = removedItems.includes(itemName);
    const newRemoved = isRemoved
      ? removedItems.filter(i => i !== itemName)
      : removedItems.length < 2
        ? [...removedItems, itemName]
        : removedItems;

    setRemovedItems(newRemoved);

    // Call back with updated content
    const newContent = bag.content.filter(item => !newRemoved.includes(item.name));
    onContentUpdate(bag.id, newContent, newRemoved);
  };

  //if (!bag) return null;
  if (!bag) return <div>⚠️ No bag provided</div>;


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Bag Contents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {bag.content.map((item, idx) => {
            const isRemoved = removedItems.includes(item.name);
            return (
              <ListGroup.Item
                key={idx}
                action
                variant={isRemoved ? 'danger' : ''}
                onClick={() => toggleItem(item.name)}
                className="d-flex justify-content-between align-items-center"
              >
                <div><i className={`bi ${item.icon} me-2`}></i>{item.name}</div>
                {isRemoved && <Badge bg="danger">Removed</Badge>}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <div className="mt-3 text-muted text-end">
          {2 - removedItems.length} removals left
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BagModalEditable;
