const uri = 'http://private-59658d-celulardireto2017.apiary-mock.com/planos'

export const getActiveByPlatformSku = async (platformSku) => {
    const plansResponse = await fetch(`${uri}/${platformSku.toUpperCase()}`)
    const json = await plansResponse.json()
    return json.planos.filter(p => p.ativo)
}