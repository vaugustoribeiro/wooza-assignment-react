const uri = 'http://private-59658d-celulardireto2017.apiary-mock.com/plataformas'

export const get = async () => {
    const response = await fetch('http://private-59658d-celulardireto2017.apiary-mock.com/plataformas')
    const json = await response.json()
    return json.plataformas
}

// como não possuo um endpoint para retornar apenas a plataforma que preciso, irei fingir que esta função faz isso.
export const getBySku = async (sku) => {
    const platforms = await get()
    const platform = platforms.find(p => p.sku.toLowerCase() === sku.toLowerCase())
    return platform
}