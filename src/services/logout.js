import { useEffect,useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
export default function Logout() {
    console.log('Hola desde el Logout')
    const authContext = useContext(AuthContext)
    const handleLogout = async()=>{
        try {
          await authContext.logout()
        } catch (error) {
          console.log(`Error en logoout: ${error}`)
        }
      }
    useEffect(()=>{
        console.log('Hola desde el useEffect del Logout')
        handleLogout()
    },[])
    return (<></>)
}
