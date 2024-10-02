export class Hours {
    id:string;
    hour:string;
}

export const appoitmentGenerate = (start:string, end:string, delay:number): Hours[] => {
    const starthourMin = start.split(":")
    const endhourMin = end.split(":")
    const turnos: Hours[] = []
    while ( +starthourMin.join("")+delay <= +endhourMin.join("") ) {
        turnos.push({id:starthourMin.join(":"), hour:starthourMin.join(":")})
        starthourMin[1] = (+starthourMin[1] + delay).toString().padStart(2, '0');
        if (+starthourMin[1] > 59) {
            starthourMin[1] = (+starthourMin[1] - 60).toString().padStart(2, '0');;
            starthourMin[0] = (+starthourMin[0] + 1).toString().padStart(2, '0');;
        } 
    }  
    return turnos;
}

