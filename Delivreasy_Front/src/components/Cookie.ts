export function getCookie(cookie_name: string): string|null
{
    const cookies = document.cookie.split('; ')
    const value = cookies
    .find(c => c.startsWith(cookie_name))
    ?.split('=')[1]
    console.log(value)
    if(value === undefined){
        return null
    }
    else{
        return decodeURIComponent(value)
        //decodeURIComponent me sauve des echapement d'espace des caractere http %20
    }
}

export function setCookie(name: string,value: string,days: number){
    const date = new Date
    date.setDate(date.getDate() + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}};`
    // ajouter option same site etc ... et httponly si besoins secu
}




