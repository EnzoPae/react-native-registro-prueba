import { useEffect,useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
export default function Logout() {
    //TODO mostrar cartel, que pase X segundos y continuar con logout
    const authContext = useContext(AuthContext)
    const handleLogout = async()=>{
        try {
          await authContext.logout()
        } catch (error) {
          console.log(`Error en logoout: ${error}`)
        }
      }
    useEffect(()=>{
        handleLogout()
    },[])
    return (<></>)
}
