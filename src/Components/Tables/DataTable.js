import React from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';

function DataTable(props) {
    const { items } = props;

    const deleteItem = (id) => {
        let confirmDelete = window.confirm('Usunąć rekord na zawsze?');
        if (confirmDelete) {
            fetch('http://localhost:3000/crud', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.json())
                .then(item => {
                    props.deleteItemFromItems(id)
                })
                .catch(err => console.log(err));
        }
    };

    const itemsTable = items.map(item => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.first}</td>
                <td>{item.last}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>{item.hobby}</td>
                <td>
                    <div style={{ width: "110px" }}>
                        <ModalForm buttonLabel="Edytuj" item={item} updateItem={props.updateItem} edit={true} />
                        <Button color="danger" onClick={() => deleteItem(item.id)}>Usuń</Button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Miejscowość</th>
                    <th>Hobby</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {itemsTable}
            </tbody>
        </Table>
    );
}

export default DataTable;