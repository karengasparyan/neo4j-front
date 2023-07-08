import axios, { AxiosResponse } from "axios";
import { AllNodeDataType, NodeType } from "./Interfaces";

const baseURL = 'http://localhost:4000/api';
const api = axios.create({ baseURL });

const create = async ({ name, properties }: NodeType) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await api.post('/node', { name, properties });
        return response.data.data;
    } catch (e: any) {
        console.error(e);
        return e.response.data.errors || e.message;
    }
};

const update = async (data: NodeType) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await api.put(`/node/${data.id}`, {
            name: data.name,
            properties: data.properties
        });
        return response.data.data;
    } catch (e: any) {
        console.error(e);
        return e.response.data.errors || e.message;
    }
};

const remove = async (id: string | undefined) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await api.delete(`/node/${id}`);
        return response.data.data;
    } catch (e: any) {
        console.error(e);
        return e.response.data.errors || e.message;
    }
};

const getById = async (id: number) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await api.get(`/node/${id}`);
        return response.data.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getAll = async () => {
    try {
        const response: AxiosResponse<{ data: AllNodeDataType }> = await api.get(`/node/all`);
        return response.data.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export {
    create,
    update,
    remove,
    getById,
    getAll
};