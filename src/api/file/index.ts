import request from "@/utils/request";

export default {
  setPortfolio: async (payload: any) => {
    const { data } = await request.post(`/upload/setPortfolio${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
  getPortfolio: async (payload: any) => {
    const { data } = await request.post(`/upload/getPortfolio${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
  delPortfolio: async (payload: any) => {
    const { data } = await request.post(`/upload/delPortfolio${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
  renamePortfolio: async (payload: any) => {
    const { data } = await request.post(`/upload/renamePortfolio?superior=${payload.superior}&name=${payload.name}`, {});
    return data;
  },
  renamePackage:  async (payload: any) => {
    const { data } = await request.post(`/upload/renamePackage?superior=${payload.superior}&name=${payload.name}`, {});
    return data;
  },
  setPackages: async (payload: any) => {
    const { data } = await request.post(`/upload/setPackages${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
  getPackages: async (payload: any) => {
    const { data } = await request.post(`/upload/getPackages${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
  delPackages: async (payload: any) => {
    const { data } = await request.post(`/upload/delPackages${payload.superior ? `?superior=${payload.superior}` : ''}`, {});
    return data;
  },
};
