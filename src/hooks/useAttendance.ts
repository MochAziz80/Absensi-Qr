import { useState, useEffect } from 'react';
import { Attendance } from '../types';
import { fetchAttendance } from '../utils/api';

export const useAttendance = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await fetchAttendance();
        setAttendance(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load attendance');
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  return { attendance, loading, error };
};