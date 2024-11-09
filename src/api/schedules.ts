import { getCookie } from '@/utils/cookie';
import api from '.';
import type { SongResponse } from './songs';
import type { User } from './department';

export enum ParticipantStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface Participant {
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  status: ParticipantStatus;  
}

export interface Schedule {
  id: string;
  name: string;
  date: Date;
  time: string;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  songs?: SongResponse[];
  participants?: {
    user: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    status: ParticipantStatus;
  }[];
}

export interface UpdateScheduleData {
  name?: string;
  date?: Date;
  participants?: Participant[]; 
}

export interface CreateScheduleData {
  name: string;
  date: Date;
  departmentId: string;
}

export interface AddParticipantData {
  userId: string;
  status: ParticipantStatus;
  userName: string;
}

export async function postSchedule(departmentId: string, data: CreateScheduleData): Promise<Schedule> {
  const token = getCookie('token');

  const response = await api.post(`/departments/${departmentId}/schedules`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getSchedulesByDepartment(departmentId: string): Promise<Schedule[]> {
  const token = getCookie('token');

  const response = await api.get(`/departments/${departmentId}/schedules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function updateScheduleById(departmentId: string, scheduleId: string, data: UpdateScheduleData): Promise<Schedule> {
  const token = getCookie('token');

  const response = await api.put(`/departments/${departmentId}/schedules/${scheduleId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getSchedulesByDepartmentById(departmentId: string, scheduleId: string): Promise<Schedule> {
  const token = getCookie('token');

  try {
    const response = await api.get(`/departments/${departmentId}/schedules/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Schedule not found.")
  }
}

export async function deleteScheduleById(departmentId: string, scheduleId: string): Promise<void> {
  const token = getCookie('token');

  await api.delete(`/departments/${departmentId}/schedules/${scheduleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addParticipantToSchedule(
  departmentId: string,
  scheduleId: string,
  data: AddParticipantData
): Promise<Schedule> {
  const token = getCookie('token');

  try {
    const response = await api.post(`/departments/${departmentId}/schedules/${scheduleId}/participants`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;  
  } catch (error) {
    throw new Error("Failed to add participant.");
  }
}


