import ModalCreateUpdate from "./Components/Modal";
import {useEffect, useState} from "react";
import {create, update, getAll, remove} from './Services'
import {Button, notification} from "antd";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [updateData, setUpdateData] = useState(null | {});
    const [data, setData] = useState({});
    const [actionData, setActionData] = useState({});

    useEffect(() => {
        async function fetchData() {
            return await getAll();
        }

        fetchData().then(data => setData(data))
    }, [action, actionData])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, action) => {
        api.info({
            message: `Node ${action}`,
            placement,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setUpdateData(null);
    };

    const handleUpdateData = (data) => {
        setUpdateData(data);
        showModal();
    }

    const removeNode = async (id) => {
        await handleActions({action: 'delete', data: { id }})
    }

    const handleActions = async ({action, data}) => {
        switch (action) {
            case 'create': {
                const newNode = await create(data);
                if (newNode) {
                    openNotification('bottomRight', action);
                    hideModal();
                    setAction(action);
                } else {
                    openNotification('bottomRight', 'ERROR');
                }
                break;
            }
            case 'update': {
                const {id, name, properties} = data;
                const updateNode = await update(id, {name, properties});
                if (updateNode) {
                    openNotification('bottomRight', action);
                    hideModal();
                    setAction(action);
                } else {
                    openNotification('bottomRight', 'ERROR');
                }
                break;
            }
            case 'delete':
                await remove(data.id);
                break;
            default:
        }
        setActionData(data);
    };

    return (
        <div className="App">
            {contextHolder}
            <h1>Neo4j synchronize with Postgres</h1>
            <ModalCreateUpdate
                isModalOpen={isModalOpen}
                updateData={updateData}
                showModal={showModal}
                hideModal={hideModal}
                handleActions={handleActions}
            />
            <div className="dataContainer">
                <div className="dataItemContainer">
                    <h2>Postgres data</h2>
                    {data?.postgres?.map(p => <div className="dataItem" key={p.id}>
                        <span className="keyTitle">id</span><p>{p.id}</p>
                        <span className="keyTitle">name</span><p>{p.name}</p>
                        <span className="keyTitle">properties</span><p>{JSON.stringify(p.properties, null, 2)}</p>
                        <Button type="default" onClick={() => handleUpdateData(p)}>Update</Button>
                        <Button type="ghost" onClick={() => removeNode(p.id)}>Delete</Button>
                    </div>)}
                </div>
                <div className="dataItemContainer">
                    <h2>neo4j data</h2>
                    {data?.neo4j?.map(p => <div className="dataItem" key={p.id}>
                        <span className="keyTitle">id</span><p>{p.id}</p>
                        <span className="keyTitle">name</span><p>{p.name}</p>
                        <span className="keyTitle">properties</span><p>{JSON.stringify(p.properties, null, 2)}</p>
                        <Button type="default" onClick={() => handleUpdateData(p)}>Update</Button>
                        <Button type="ghost" onClick={() => removeNode(p.id)}>Delete</Button>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default App;
