import axios from "axios";

const create = async ({name, properties}) => {
    try {
        const { data } = await axios.post('http://localhost:4000/api/node', {name, properties: JSON.parse(properties)});
        return data.data;
    } catch (e) {
        console.error(e)
        return null
    }
}

const update = async (id, body) => {
    try {
        const { data } = await axios.put(`http://localhost:4000/api/node/${id}`, body);
        return data.data;
    } catch (e) {
        console.error(e)
        return null
    }
}

const remove = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/api/node/${id}`);
        return data.data;
    } catch (e) {
        console.error(e)
        return null
    }
}

const getById = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/node/${id}`);
        return data.data;
    } catch (e) {
        console.error(e)
        return null
    }
}

const getAll = async () => {
    try {
        const { data } = await axios.get('http://localhost:4000/api/node/all');
        console.log(88888, data.data)
        return data.data;
    } catch (e) {
        console.error(e)
        return null
    }
}

export {
    create,
    update,
    remove,
    getById,
    getAll
}