import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useSettingStore = defineStore('setting', {
  state: () => ({
    settings : {},
  }),

  persist: true,

  actions: {
    async getData () {
      try {
        const res = await axiosInstance.get('/settings');
        if( res?.data?.success){
          this.settings = res?.data?.result;
        }
      } catch (error) {
        console.log(error);
      }
    },
//global_function
    findSetting(settingKey){
      return this.settings?.data?.find((i)=> i.key == settingKey)?.value
    }
  },
  
});

