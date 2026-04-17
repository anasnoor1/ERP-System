import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export default function useCrud(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    const page = params.page || pagination.current;
    const limit = params.limit || pagination.pageSize;
    try {
      const { data: res } = await api.get(endpoint, { params: { page, limit, ...params } });
      setData(res.data);
      setPagination(p => ({ ...p, total: res.total, current: page, pageSize: limit }));
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (values) => {
    try {
      await api.post(endpoint, values);
      fetchData();
    } catch (error) {
      console.error('Create failed', error);
    }
  };

  const update = async (id, values) => {
    try {
      await api.put(`${endpoint}/${id}`, values);
      fetchData();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return { data, loading, pagination, fetchData, create, update, remove };
}
