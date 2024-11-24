import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
const Login = ({login})=>{

    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState({
        email:"",
        password:"",
    })

    
    const handleInputChange=(field, e)=>{
        setLoginInput((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const loginCk = await login(loginInput)
        if(loginCk){
            navigate('/');
        }
    }

    return (
        <section className="py-5">
                <div className="container px-5">
                    <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-door-open"></i></div>
                            <h1 className="fw-bolder">로그인</h1>
                            <p className="lead fw-normal text-muted mb-0">아이디어를 공유해봐요!</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">                           
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" 
                                        onChange={(e)=>handleInputChange("email",e)} 
                                        type="email" 
                                        placeholder="name@example.com"
                                        />
                                        <label>Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" 
                                        onChange={(e)=>handleInputChange("password",e)} 
                                        type="password" 
                                        placeholder=""/>
                                        <label>password</label>
                                    </div>
                                    <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">로그인</button></div>
                                </form>
                                <Link to="/SignUp">회원가입</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Login;