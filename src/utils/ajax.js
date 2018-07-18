import axios from 'axios';
export const baseUrl = '/mock'
export function getData(url){
        axios
      .get(url)
      
}