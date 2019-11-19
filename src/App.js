import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalForm from './Components/Modals/Modal';
import DataTable from './Components/Tables/DataTable';

function App() {
	const [items, setItems] = useState([]);

	const getItems = () => {
		fetch('http://localhost:3000/crud')
			.then(response => response.json())
			.then(fetchItems => setItems(fetchItems))
			.catch(err => console.log(err));
	};

	const addItem = (item) => {
		setItems([...items, item]);
	};

	const updateItem = (item) => {
		const itemIndex = items.findIndex(data => data.id === item.id);
		const newArray = [
			...items.slice(0, itemIndex),
			item,
			...items.slice(itemIndex + 1)
		];
		setItems(newArray);
	};

	const deleteItemFromItems = (id) => {
		const updatedItems = items.filter(item => item.id !== id);
		setItems(updatedItems);
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<Container className="App">
			<Row>
				<Col>
					<h1 style={{ margin: "20px 0" }}>Bazy danych CRUD</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<DataTable items={items} updateItem={updateItem} deleteItemFromItems={deleteItemFromItems} />
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Dodaj rekord" addItem={addItem} edit={false} item={{}} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;