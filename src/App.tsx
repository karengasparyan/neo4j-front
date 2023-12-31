import ModalCreateUpdate from "./Components/Modal";
import React, { useEffect, useState } from "react";
import { create, update, getAll, remove } from './services'
import { Button, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AllNodeDataType, NodeType } from "./Interfaces";

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<string>('');
    const [updateData, setUpdateData] = useState<NodeType | null>(null);
    const [data, setData] = useState<AllNodeDataType | null>({});
    const [actionData, setActionData] = useState<any>({});

    useEffect(() => {
        async function fetchData() {
            return await getAll();
        }

        fetchData().then(data => setData(data))
    }, [action, actionData])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, action: string) => {
        api.info({
            message: `Node ${action}`,
            placement: placement,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setUpdateData(null);
    };

    const handleUpdateData = (data: NodeType) => {
        setUpdateData(data);
        showModal();
    }

    const removeNode = async (id: string | undefined) => {
        await handleActions({ action: 'delete', data: { id } });
    }

    // I didn't use redux or other state managers because the project is small
    const handleActions = async ({ action, data }: { action: string, data: NodeType }) => {
        switch (action) {
            case 'create': {
                const newNode = await create(data);
                if (newNode.id) {
                    openNotification('bottomRight', action);
                    hideModal();
                    setAction(action);
                } else {
                    //response error handling
                    openNotification('bottomRight', newNode);
                }
                break;
            }
            case 'update': {
                const updateNode = await update(data);
                if (updateNode.id) {
                    openNotification('bottomRight', action);
                    hideModal();
                    setAction(action);
                } else {
                    //response error handling
                    openNotification('bottomRight', updateNode);
                }
                break;
            }
            case 'delete': {
                const deleteNode = await remove(data.id);
                if (deleteNode.id) {
                    openNotification('bottomRight', action);
                    hideModal();
                    setAction(action);
                } else {
                    //response error handling
                    openNotification('bottomRight', action);
                }
                break;
            }
            default: openNotification('bottomRight', 'something went wrong');
        }
        setActionData(data);
    };

    return (
        <div className="App">
            {contextHolder}
            <h1 className="title">Neo4j synchronize with Postgres</h1>
            <ModalCreateUpdate
                isModalOpen={isModalOpen}
                updateData={updateData}
                showModal={showModal}
                hideModal={hideModal}
                handleActions={handleActions}
            />
            {!data?.postgres?.length && <div><h3 className="emptyDataTitle">Please create nodes</h3></div>}
            <div className="dataContainer">
                <div className="dataItemContainer">
                    <h2 className="title">Postgres data</h2>
                    {data?.postgres?.map(p => (
                        <div className="dataItem" key={p.id}>
                            <span className="keyTitle">id</span>
                            <p>{p.id}</p>
                            <span className="keyTitle">name</span>
                            <p>{p.name}</p>
                            <span className="keyTitle">properties</span>
                            <p>{JSON.stringify(p.properties, null, 2)}</p>
                            <Button type="default" onClick={() => handleUpdateData(p)}>Update</Button>
                            <Button type="ghost" onClick={() => removeNode(p.id)}>Delete</Button>
                        </div>
                    ))}
                </div>
                <div className="dataItemContainer">
                    <h2 className="title">neo4j data</h2>
                    {data?.neo4j?.map(p => (
                        <div className="dataItem" key={p.id}>
                            <span className="keyTitle">id</span>
                            <p>{p.id}</p>
                            <span className="keyTitle">name</span>
                            <p>{p.name}</p>
                            <span className="keyTitle">properties</span>
                            <p>{JSON.stringify(p.properties, null, 2)}</p>
                            <Button type="default" onClick={() => handleUpdateData(p)}>Update</Button>
                            <Button type="ghost" onClick={() => removeNode(p.id)}>Delete</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;