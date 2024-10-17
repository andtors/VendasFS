import {httpClient} from '@/app/api/http/index'
import { IDashboardData } from '../models/dashboard/IDashboard'
import { AxiosResponse } from 'axios'

const resourcedURL: string = '/api/dashboard'

export const useDashboardService = () => {
    return {
        get: async (): Promise<IDashboardData> => {
            const response: AxiosResponse<IDashboardData> = await httpClient.get(resourcedURL)
            return response.data
        }
    }
}