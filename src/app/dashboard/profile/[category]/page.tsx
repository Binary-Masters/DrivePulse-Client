import ChangePassword from "@/Components/ChangePassword/ChangePassword"
import '../profile.css'
import Edit from "@/Components/Dashboard/ProfileCard/Edit"

const Password = ({params}) => {
  return (
    <div className=" min-h-screen classes flex justify-center items-center mx-auto">
     <p>{params?.category}</p>
      {/* dynamic route here password  */}
      {
        params?.category == 'password' && <ChangePassword/> 
      }
      {
        params?.category == 'edit' && <Edit/> 
      }

    </div>
  )
}

export default Password
