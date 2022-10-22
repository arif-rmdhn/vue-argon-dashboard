import {baseApi} from '@/plugins/axios';

const api = '/api/todo';

const list = () => baseApi.get(`${api}`);
const add = (body) => baseApi.post(`${api}`, body);
const update = (id) => baseApi.put(`${api}/${id}`);
const del = (id) => baseApi.put(`${api}/${id}`);

export { list, add, update, del};