import  {Button, Modal } from 'antd';
import CreateUpdateForm from './CreateUpdateForm';
import React from "react";
import {NodeType} from "../Interfaces";

interface ModalCreateUpdateProps {
    hideModal: () => void;
    updateData: NodeType | null;
    showModal: () => void;
    isModalOpen: boolean;
    handleActions: (data: any) => void;
}

const ModalCreateUpdate: React.FC<ModalCreateUpdateProps> = ({
                                                                 hideModal,
                                                                 updateData,
                                                                 showModal,
                                                                 isModalOpen,
                                                                 handleActions,
                                                             }) => {
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Node
            </Button>
            <Modal footer={null} title="Create Node" visible={isModalOpen} onCancel={hideModal}>
                <CreateUpdateForm updateData={updateData} handleActions={handleActions}/>
            </Modal>
        </>
    );
};

export default ModalCreateUpdate;