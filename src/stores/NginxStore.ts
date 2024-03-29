import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosError } from 'axios';

export interface NginxRule {
    id: number
    serviceName: string
    location: string
    port: number
    websocketsEnabled: boolean
}

export const useNginxStore = defineStore('nginx', () => {
    const rules = ref<NginxRule[]>([])

    const fetchAllRules = async () => {
        const res = await axios.get<NginxRule[]>("https://api.mcsynergy.nl/admin-panel/nginx/all")
        .catch((error: AxiosError<{message: string}>) => {
            alert(`Something went wrong while fetching rules.\n${error.response?.data.message}`)
        })
        if(res) rules.value = res.data
    }

    const fetchRuleById = async (id: number) => {
        const res = await axios.get<NginxRule>(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`)
        .catch((error: AxiosError<{message: string}>) => {
            alert(`Something went wrong while fetching rule (id: ${id}).\n${error.response?.data.message}`)
        })
        if(!res) return;
        const {data} = res;
        const index = rules.value.findIndex((rule) => rule.id === data.id)
        if(index !== -1) rules.value[index] = data
        else rules.value.push(data)
        return data
    }

    const createRule = async (rule: NginxRule) => {
        await axios.post(`https://api.mcsynergy.nl/admin-panel/nginx`, rule)
        .catch((error: AxiosError<{message: string}>) => {
            alert(`Something went wrong while creating rule.\n${error.response?.data.message}`)
        })
        await fetchAllRules()
    }

    const updateRule = async (id: number, rule: NginxRule) => {
        await axios.patch(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`, rule)
        .catch((error: AxiosError<{message: string}>) => {
            alert(`Something went wrong while updating rule (id: ${id}).\n${error.response?.data.message}`)
        })
        await fetchRuleById(id)
    }

    const deleteRule =async (id: number) => {
        await axios.delete(`https://api.mcsynergy.nl/admin-panel/nginx/${id}`)
        .catch((error: AxiosError<{message: string}>) => {
            alert(`Something went wrong while deleting rule (id: ${id}).\n${error.response?.data.message}`)
        })
        await fetchAllRules()
    }

    return {rules, fetchAllRules, fetchRuleById, createRule, updateRule, deleteRule}
})
