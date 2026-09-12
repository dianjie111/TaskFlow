import { ref } from "vue";

const show=ref(false)

export function useShow(){
    const open=()=>show.value=true
    const stop=()=>show.value=false

    return {open,stop,show}
}