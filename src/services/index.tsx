import axiosInstance2 from "@/lib/axios/address.request";
import axiosInstance3 from "@/lib/axios/payment.request";
import axiosInstance from "@/lib/axios/request";
import { QueryParams } from "@/types";

export const getMethod = ({
  pathName,
  params,
  token,
}: {
  pathName: string;
  token?: string;
  params?: QueryParams;
}) => {
  return axiosInstance.get(pathName, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postMethod = <T,>({
  pathName,
  params,
  request,
  token,
}: {
  pathName: string;
  token?: string;
  request?: T;
  params?: { [key: string]: string };
}) => {
  return axiosInstance.post(pathName, request, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putMethod = <T,>({
  pathName,
  params,
  request,
  token,
}: {
  pathName: string;
  token?: string;
  params?: { [key: string]: string };
  request?: T;
}) => {
  return axiosInstance.put(pathName, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
export const deleteMethod = <T,>({
  pathName,
  token,
}: {
  pathName: string;
  token?: string;
}) => {
  return axiosInstance.delete(pathName, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMethod2 = ({
  pathName,
  params,
  token,
}: {
  pathName: string;
  token?: string;
  params?: QueryParams;
}) => {
  return axiosInstance2.get(pathName, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postMethod2 = <T,>({
  pathName,
  params,
  request,
  token,
}: {
  pathName: string;
  token?: string;
  request?: T;
  params?: { [key: string]: string };
}) => {
  return axiosInstance2.post(pathName, request, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putMethod2 = <T,>({
  pathName,
  params,
  request,
  token,
}: {
  pathName: string;
  token?: string;
  params?: { [key: string]: string };
  request?: T;
}) => {
  return axiosInstance2.put(pathName, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

export const deleteMethod2 = <T,>({
  pathName,
  token,
}: {
  pathName: string;
  token?: string;
}) => {
  return axiosInstance2.delete(pathName, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getMethod3 = ({
  pathName,
  params,
  token,
}: {
  pathName: string;
  token?: string;
  params?: QueryParams;
}) => {
  return axiosInstance3.get(pathName, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const putMethod3 = <T,>({
  pathName,
  params,
  request,
  token,
}: {
  pathName: string;
  token?: string;
  params?: { [key: string]: string };
  request?: T;
}) => {
  return axiosInstance3.put(pathName, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
