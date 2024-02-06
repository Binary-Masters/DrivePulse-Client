import ChangePassword from "@/Components/ChangePassword/ChangePassword"
import '../profile.css'

const Password = ({params}) => {
  return (
    <div className=" min-h-screen classes flex justify-center items-center mx-auto">
      {/* dynamic route here password  */}
      {
        params?.category == 'password' && <ChangePassword/> 
      }
    </div>
  )
}

export default Password
