import {Button, Modal} from 'antd';
import CreateForm from "./CreateForm";

const ModalCreateUpdate = ({hideModal, updateData, showModal, isModalOpen, handleActions}) => {
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Node
            </Button>
            <Modal footer={null} title="Create Node" open={isModalOpen} onCancel={hideModal}>
                <CreateForm updateData={updateData} handleActions={handleActions}/>
            </Modal>
        </>
    );
};
export default ModalCreateUpdate;