import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditForm from '../Forms/AddEditForm';

function ModalForm(props) {
    const { buttonLabel, className } = props;
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>

    let title = '';
    let btnColor = '';

    if (buttonLabel === 'Edytuj') {
        btnColor = 'warning';
        title = 'Edytuj rekord';
    } else {
        btnColor = 'success';
        title = 'Dodaj nowy rekord'
    }

    return (
        <div>
            <Button
                color={btnColor}
                onClick={toggle}
                style={{ float: "left", marginRight: "10px" }}
            >
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                <ModalBody>
                    <AddEditForm
                        addItem={props.addItem}
                        updateItem={props.updateItem}
                        toggle={toggle}
                        item={props.item}
                        edit={props.edit} />
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalForm;