import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Sign_up =({signup}) =>{
    
    const initState ={
        nickname:"",
        email: "",
        password: "",
        name: "",
        major:""
        
    }
    
    const navigate = useNavigate();
    const [userState,setUserState] = useState({...initState});
    const [valueError,setValueError] = useState({
        nickname:"",
        email: "",
        password: "",
        name: "",
        major:""
    });
    
    const valueCheck =(name,value)=>{
        let error= '';
        switch(name){
        case "nickname":
            if(!value){
                error="닉네임을 입력 해주세요"
            }
            break;
        case "email":
            if(!value){
                error ="이메일을 입력 주세요";
            } else if (!/\S+@\S+\.\S+/.test(value)){
                error ="유효한 이메일 주소를 입력해주세요."
            }
            break;
        case "password":
            if(!value){
                error="비밀번호를 입력 해주세요";
            } else if (value.length <6){
                error="6글자 이상이여만 합니다";
            }
            break;
        case "name":
            if(!value){
                error="이름을 입력 해주세요";
            }
            break;
        case "major":
            if(!value){
                error="전공을 입력 해주세요";
            }
            break;
        default:
            break;    
        }
        return error;
    }
    
    const hendleChange= (e) => {
        const {name,value} = e.target;
    
        setUserState({...userState,[name]:value});
    
        let error= valueCheck(name,value);
        setValueError({...valueError,[name]:error});
        
    }
    
    const submitCheck = async(e)=>{
        e.preventDefault();
        const nweError={};
        Object.keys(userState).forEach(key=>{
        const error = valueCheck(key, userState[key])
        if(error){
            nweError[key] =error;
        }
        console.log(key,userState[key]);
        });
        if(Object.keys(nweError).length > 0 ){
        setValueError(nweError);
        return;
        }
        let signupCheck = await signup(userState);
        handling(signupCheck);
    }
    
    const handling = (signupCk) => {
        console.log(signupCk);
        if (signupCk) {
        navigate("/");
        }
    };
    return(
        <section className="py-5">
                <div className="container px-5">
                    <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-door-open"></i></div>
                            <h1 className="fw-bolder">회원가입</h1>
                            <p className="lead fw-normal text-muted mb-0"> 아이디어를 공유에 합류해요!</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                                <form>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="text" name="nickname" onChange={hendleChange} placeholder=""/>
                                        <label>nickname address</label>
                                        {valueError.email && <div>{valueError.nickname}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="email" name="email" onChange={hendleChange} placeholder="name@example.com"/>
                                        <label>Email address</label>
                                        {valueError.email && <div>{valueError.email}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="password" name="password" onChange={hendleChange} placeholder=""/>
                                        <label>password address</label>
                                        {valueError.email && <div>{valueError.password}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="text" name="name" onChange={hendleChange} placeholder=""/>
                                        <label>name address</label>
                                        {valueError.email && <div>{valueError.name}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="text" name="major" onChange={hendleChange} placeholder=""/>
                                        <label>major address</label>
                                        {valueError.email && <div>{valueError.major}</div>}
                                    </div>
                                    <div className="d-grid"><button className="btn btn-primary btn-lg" type="submit" onClick={submitCheck}>회원가입</button></div>
                                </form>
                            </div>
                        </div>   
                    </div>
                </div>
        </section>
    )
    
}
export default Sign_up;