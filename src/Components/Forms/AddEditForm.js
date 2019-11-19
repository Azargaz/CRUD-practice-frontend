import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
    let { item } = props;
    const [newItem, setNewItem] = useState({
        id: 0,
        first: '',
        last: '',
        email: '',
        phone: '',
        location: '',
        hobby: ''
    });

    const onChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const submitFormAdd = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/crud', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    props.addItem(item[0])
                    props.toggle();
                } else {
                    console.log('błąd');
                }
            })
            .catch(err => console.log(err));
    };

    const submitFormEdit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/crud', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    props.updateItem(item[0]);
                    props.toggle();
                } else {
                    console.log('błąd');
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if(item) {
            setNewItem(item);
        }
    }, [item]);

    return (
        <Form onSubmit={props.edit ? submitFormEdit : submitFormAdd}>
            <FormGroup>
                <Label for="first">Imie</Label>
                <Input type="text" name="first" id="first" onChange={onChange} value={newItem.first === null ? '' : newItem.first} />
            </FormGroup>
            <FormGroup>
                <Label for="last">Nazwisko</Label>
                <Input type="text" name="last" id="last" onChange={onChange} value={newItem.last === null ? '' : newItem.last} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" onChange={onChange} value={newItem.email === null ? '' : newItem.email} />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Telefon</Label>
                <Input type="text" name="phone" id="phone" onChange={onChange} value={newItem.phone === null ? '' : newItem.phone} placeholder="000-000-000" />
            </FormGroup>
            <FormGroup>
                <Label for="location">Miejscowość</Label>
                <Input type="text" name="location" id="location" onChange={onChange} value={newItem.location === null ? '' : newItem.location} placeholder="Miasto" />
            </FormGroup>
            <FormGroup>
                <Label for="hobby">Hobby</Label>
                <Input type="text" name="hobby" id="hobby" onChange={onChange} value={newItem.hobby === null ? '' : newItem.hobby} />
            </FormGroup>
            <Button>Wyślij</Button>
        </Form>
    );
}

export default AddEditForm;