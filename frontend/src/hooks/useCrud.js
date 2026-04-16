import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import api from '../services/api';

export default function useCrud(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data: res } = await api.get(endpoint, { params: { page: pagination.current, limit: pagination.pageSize, ...params } });
      setData(res.data);
      setPagination(p => ({ ...p, total: res.total }));
    } catch { message.error('Failed to load data'); }
    finally { setLoading(false); }
  }, [endpoint, pagination.current, pagination.pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = async (values) => {
    await api.post(endpoint, values);
    message.success('Created successfully');
    fetchData();
  };

  const update = async (id, values) => {
    await api.put(`${endpoint}/${id}`, values);
    message.success('Updated successfully');
    fetchData();
  };

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    message.success('Deleted successfully');
    fetchData();
  };

  const handleTableChange = (pag) => setPagination(p => ({ ...p, current: pag.current, pageSize: pag.pageSize }));

  return { data, loading, pagination, fetchData, create, update, remove, handleTableChange };
}
