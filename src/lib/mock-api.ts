export interface ApiPayload {
  source: 'SISTER' | 'OBE' | 'IKU';
  target: number;
  actual: number;
  isCompliant: boolean;
  rawData: any;
}

export const fetchSisterData = async (prodiId: string): Promise<ApiPayload> => {
  // Mock API call to SISTER
  return {
    source: 'SISTER',
    target: 80, // 80% dosen wajib publikasi
    actual: 55, // Hanya 55%
    isCompliant: false,
    rawData: {
      totalLecturers: 20,
      publishedLecturers: 11,
      lastSync: new Date().toISOString()
    }
  };
};

export const fetchObeData = async (prodiId: string): Promise<ApiPayload> => {
  // Mock API call to OBE
  return {
    source: 'OBE',
    target: 100, // 100% mata kuliah punya CPL
    actual: 100,
    isCompliant: true,
    rawData: {
      totalCourses: 45,
      coursesWithCPL: 45,
      lastSync: new Date().toISOString()
    }
  };
};
