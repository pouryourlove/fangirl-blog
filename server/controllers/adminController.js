export const adminLogin = async (req, res) => {
    try {
      const {email, password} = req.body;
      
      if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
        return res.json({success: false, message: "Invalid credentials"})
      }
    }catch(error){

    }
}