import axios, { AxiosResponse } from "axios";
import {AllNodeDataType, NodeType} from "./Interfaces";

const BASE_URL = 'http://localhost:4000/api/node';

const create = async ({ name, properties }: NodeType) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await axios.post(`${BASE_URL}`, { name, properties });
        return response.data.data;
    } catch (e: any) {
        console.error(e);
        return e.response.data.errors;
    }
};

const update = async (data: NodeType) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await axios.put(`${BASE_URL}/${data.id}`, {
            name: data.name,
            properties: data.properties
        });
        return response.data.data;
    } catch (e: any) {
        console.error(e);
        return e.response.data.errors;
    }
};

const remove = async (id: string | undefined) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await axios.delete(`${BASE_URL}/${id}`);
        return response.data.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getById = async (id: number) => {
    try {
        const response: AxiosResponse<{ data: NodeType }> = await axios.get(`${BASE_URL}/${id}`);
        return response.data.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getAll = async () => {
    try {
        const response: AxiosResponse<{ data: AllNodeDataType }> = await axios.get(`${BASE_URL}/all`);
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